import React, { useState, useEffect } from "react";

import {
  Typography,
  InputNumber,
  Button,
  Rate,
  Tooltip,
  Tabs,
  Table,
  Popconfirm,
  Menu,
  Input,
  message,
  Space,
  Select,
  Badge,
  Tag,
  Modal,
  Popover,
  Form,
  Upload,
} from "antd";

import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";


import { deleteProduct, getProduct, getStockers, updateproduct } from "../../utils/adminApi";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function ProductDetails() {


  const [current, setCurrent] = useState(1);

  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(10);
    const [traders, setTraders] = useState([]);


  const deleteSelectedProduct = async (id) => {
    const items = await deleteProduct(id);

    if (items.error) {
      setProductModalOpen(false);
      message.error("Something went wrong");
    } else {
      message.success("product deleted");
      setProductModalOpen(false);
    }
  };

  const handlePage=(current,limit)=>{
    setCurrent(current)
    setLimit(limit)
    console.log(limit,current,"current page")
    getAllProduct(current,limit)


  }

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [avatar, setAvatar] = useState();

  const [spinning, setSpinning] = useState(false);
  const [updateProductData, setupdateProductData] = useState([
    {
      name: "",
      image: "image",
      rate: "",
      id: "",
      soldBy: "",
      offer: "",
      brand: "",
      stock: "",
      category: "",
      subcategory: "",
      discription: "",
      specs: [],
    },
  ]);
  const [productData, setProductData] = useState([]);

  const [form] = Form.useForm();

  //product data editor model

  const showProductModal =async (data) => {
    const response=await getStockers()
    
    if (response.error) {
      message.error("Something went wrong");
    } else {
      setTraders(response.stockers);
    }
      
       setupdateProductData(data)
        
      
    
    console.log(data,"modal")
   
    
    setProductModalOpen(true);

    console.log(updateProductData,"afterup");
  };

  const registerimage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handlProducteOk = () => {
    setProductModalOpen(false);
    form.resetFields();
  };

  const handleProductCancel = () => {
    setProductModalOpen(false);
    form.resetFields();
  };
  const onFinish = (values) => {
    setSpinning(true)
    let productId = updateProductData._id;
    values.image = avatar;
    values.id = productId;
    updateSelectedproduct(productId, values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const updateSelectedproduct = async (id, data) => {
    const items = await updateproduct(id, data);

    if (items.error) {
      message.error("Something went wrong");
      handlProducteOk();
      setSpinning(false);
      form.resetFields();
    } else {
      setSpinning(false);
      message.success("Product Updated Successfully");
      handlProducteOk();
      form.resetFields();

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };

  //ProductTable

  const productColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      fixed: "left",
      width: 200,
    },
    {
      title: "image",
      dataIndex: "image",
      key: "id",
      width: 150,
      maxWidth: 50,
      render: (image) => (
        <div className="image">
          <img alt={"product Image"} src={image} />
        </div>
      ),
      // render:  () => <img src={"image"} alt="product Image"  />
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "id",
      width: 100,
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "id",
      width: 100,
    },
    {
      title: "Catagory",
      dataIndex: "category",
      key: "id",
      width: 150,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "id",
      width: 150,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "id",
      width: 100,
    },
    {
      title: "Sold By",
      dataIndex: "soldBy",
      key: "id",
      width: 150,
    },

    {
      title: "Action",
      fixed: "right",
      dataIndex: "data",
      key: "data",
      width: 100,
      render: (data) => (
        <Space size="middle">
          <Tooltip title="View">
            <Link to={`/productDetails/${data._id}`}>
              <FaEye></FaEye>
            </Link>
          </Tooltip>
          <Tooltip title="Edit user role">
            <Link>
              <FaEdit
                onClick={() => {
                  showProductModal(data);
                }}
              ></FaEdit>
            </Link>
          </Tooltip>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteSelectedProduct(data._id)}
          >
            {" "}
            <Tooltip title="Delete">
              <Link>
                <FaTrash></FaTrash>
              </Link>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const getAllProduct = async (current,limit) => {
    const items = await getProduct(current,limit);
    setTotal(items.filterdProductCount)
    setProductData(
      items.products.map((data) => ({
        name: data.name,
        image: data.image[0].url,
        rate: data.price,
        id: data._id,
        soldBy: data.soldBy.name||"newDelhi Collections",
        offer: data.offer,
        brand: data.brand,
        stock: data.stock,
        category: data.category,
        subcategory: data.subCategory,
        discription: data.discription,
        specs: data.specs,
        data: data,
      }))
    );
  };

  useEffect(() => {
    getAllProduct(current,limit);
    console.log(updateProductData)
  }, []);

  return (
    <div >
      <div>
      
            <Table
              dataSource={productData}
              columns={productColumns}
              pagination={{
                pageSize:limit,
                current:current,
                total:total,
                onChange:(current,limit)=>{handlePage(current,limit)},
           
              
              }}
              scroll={{ x: 1500 }}
            />
         
      </div>
      <Modal
        title="Update Product"
        open={productModalOpen}
        onOk={handlProducteOk}
        onCancel={handleProductCancel}
        width={1000}
        style={{ top: 20 }}
        footer={null}
      >
        <div className="create-product">
          <Form
            form={form}
            name="basic"
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="form">
              <Form.Item
                label="Name"
                name="name"
                initialValue={updateProductData.name}
                rules={[
                  {
                    required: true,
                    message: "Please enter product name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    message: "Please select product category!",
                  },
                ]}
              >
                <Select defaultValue={updateProductData.category}>
                  <Option value="electronics">Electronics</Option>
                  <Option value="books">Books</Option>
                  <Option value="mobiles">Mobiles</Option>
                  <Option value="homeAppliances">Home Appliances</Option>
                  <Option value="books">Books</Option>
                  <Option value="buety">Buety</Option>
                  <Option value="toys">Toys</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="form">
              <Form.Item
                label="Sub Category"
                name="subCategory"
                initialValue={updateProductData.subCategory}
                rules={[
                  {
                    required: true,
                    message: "Please select product Sub category!",
                  },
                ]}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select product Gender!",
                  },
                ]}
              >
                <Select>
                  <Option value="men">Men</Option>
                  <Option value="women">Women</Option>
                  <Option value="kids">Kids</Option>
                  <Option value="baby">Baby</Option>
                  <Option value="all">All</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="form">
              <Form.Item
                label="Brand"
                name="brand"
                initialValue={updateProductData.brand}
                rules={[
                  {
                    required: true,
                    message: "Please Enter product Brand!",
                  },
                ]}
              >
                <Input></Input>
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                initialValue={updateProductData.price}
                rules={[
                  {
                    required: true,
                    message: "Please enter product price!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </div>
            <div className="form">
              <Form.Item
                label="Count"
                name="count"
                initialValue={updateProductData.stock}
                rules={[
                  {
                    required: true,
                    message: "Please Enter product Count!",
                  },
                ]}
              >
                <InputNumber></InputNumber>
              </Form.Item>

              <Form.Item
                label="Offer"
                initialValue={0}
                name="offer"
                rules={[
                  {
                    required: false,
                    message: "Please Enter product Count!",
                    // pattern: new RegExp(/^[0-9]+$/)
                  },
                ]}
              >
                <InputNumber maxLength={4}></InputNumber>
              </Form.Item>
            </div>
            <div className="form">
            <Form.Item
                      label="Seller"
                      name="soldBy"
                      rules={[
                        {
                          required: true,
                          message: "Please select seller!",
                        },
                      ]}
                    >
                      <Select>
                        {traders.map((trader) => (
                          <Option value={trader._id}>{trader.name}</Option>
                        ))}
                      
                      </Select>
                    </Form.Item>
              <Form.Item
                label="Upload"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Please Upload image!",
                  },
                ]}
              >
                <input type="file" accept="image/*" onChange={registerimage} />
              </Form.Item>
            </div>
            <Form.Item
              label="Discription"
              name="discription"
              initialValue={updateProductData.discription}
              rules={[
                {
                  required: true,
                  message: "Please enter product discription!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <div className="form"></div>
            {/* <Form.List
              name="specs"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(
                        new Error("At least 1 specification")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields={...fi}, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Specifications" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input specification ",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="specification"
                          style={{ width: "80%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.specs)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add specification
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List> */}

            <div className="button">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" loading={spinning}>
                  Update Product
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                {" "}
                <Button type="primary" onClick={handleProductCancel}>
                  cancel
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>

      {/* user role editing model */}
    </div>
  );
}

export default ProductDetails;
