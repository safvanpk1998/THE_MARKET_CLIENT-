import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Typography,
  Select,
  Modal,
  message,
  Button,
  Form,
  InputNumber,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "./action.scss";
import Header from "../../../components/layout-component/header";
import graph1 from "../../../assets/others/graph3.png";
import { createProduct } from "../../../slices/productSlice";
import { createNewStocker, getStockers } from "../../../utils/adminApi";
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function Actions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockeropen, setstockeropen] = useState(false);
  const [traders, setTraders] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const products = useSelector((state) => state.products);
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const dispatch = useDispatch();
  const showStocker = () => {
    setstockeropen(true);
  };
  const stockerOk = () => {
    setstockeropen(false);
  };
  const addNewStocker = async (value) => {
    const stocker = await createNewStocker(value);
    setSpinning(true);
    if (stocker.error) {
      message.error("Something went wrong");
      stockerOk();
    } else {
      message.success("New Stocker Added Successfully");
      stockerOk();
    }
  };

  const showModal = async () => {
    setIsModalOpen(true);
    const response = await getStockers();

    if (response.error) {
      message.error("Something went wrong");
    } else {
      setTraders(response.stockers);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setstockeropen(false);
  };

  const addNewProduct = (values) => {
    const productData = values;
    values.image = avatar;
    dispatch(createProduct(productData));
    setLoading(products.loading);

    setTimeout(() => {
      if (!products.loading) {
        handleOk();
        form.resetFields();
        message.success("Product Added Successfully");
      }
    }, 3000);
  };
  const onFinishFailed = (errorInfo) => {
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

  useEffect(() => {}, [dispatch]);
  return (
    <>
      <Header></Header>
      <div className="action-component">
        <div className="head">
          <div className="header">
            <Title level={4}> Admin Dashboard</Title>
          </div>
          <div className="button">
            <div className="add_product">
              {" "}
              <Button onClick={showModal}>Add New Product</Button>
            </div>
            <div className="add_stocker">
              <Button onClick={showStocker}>Add New Stocker</Button>
            </div>
          </div>
        </div>
        <div className="crud">
          <div className="create" style={{ backgroundColor: "#43a9a9" }}>
            {/* <div>
              <img src={Ico} alt="" />
            </div> */}
            <div className="title">
              <div className="data">
                <Title level={5}> Total Product</Title>
                <div className="count">
                  <Title level={2}> 4350</Title>
                </div>
                <p>(in Last One Month)</p>
              </div>

              <div>
                <img src={graph1} alt="" />
              </div>
            </div>
          </div>
          <div className="create" style={{ backgroundColor: "#582d88" }}>
            {/* <div>
              <img src={Ico} alt="" />
            </div> */}
            <div className="title">
              <div className="data">
                <Title level={5}> Total Orders</Title>
                <div className="count">
                  <Title level={2}> 8649</Title>
                  <p>(in Last One Month)</p>
                </div>
              </div>

              <div>
                <img src={graph1} alt="" />
              </div>
            </div>
          </div>
          <div className="create" style={{ backgroundColor: "#1ba51ee3" }}>
            {/* <div>
              <img src={Ico} alt="" />
            </div> */}
            <div className="title">
              <div className="data">
                <Title level={5}> Total Users</Title>
                <div className="count">
                  <Title level={2}> 1834</Title>
                  <p>(From the beggnning)</p>
                </div>
              </div>
              <div>
                <img src={graph1} alt="" />
              </div>
            </div>
          </div>
          <div
            className="create"
            style={{ backgroundColor: "rgb(221 61 101 / 83%)" }}
          >
            {/* <div>
              <img src={Ico} alt="" />
            </div> */}
            <div className="title">
              <div className="data">
                <Title level={5}> Total Income</Title>
                <div className="count">
                  <Title level={2}> 187529468</Title>
                  <p>(in Last One Month)</p>
                </div>
              </div>

              <div>
                <img src={graph1} alt="" />
              </div>
            </div>
          </div>
          <div
            className="create"
            style={{ backgroundColor: "rgb(221 183 45)" }}
          >
            {/* <div>
              <img src={Ico} alt="" />
            </div> */}
            <div className="title">
              <div className="data">
                <Title level={5}> Total Stockers </Title>
                <div className="count">
                  <Title level={2}> 4350</Title>
                </div>
              </div>

              <div>
                <img src={graph1} alt="" />
              </div>
            </div>
          </div>
          <div
            className="create"
            style={{ backgroundColor: "rgb(41 126 208)" }}
          >
            {/* <div>
              <img src={Ico} alt="" />
            </div> */}
            <div className="title">
              <div className="data">
                <Title level={5}> Order Pending</Title>
                <div className="count">
                  <Title level={2}> 4350</Title>
                </div>
              </div>

              <div>
                <img src={graph1} alt="" />
              </div>
            </div>
          </div>
          <div
            className="create"
            style={{ backgroundColor: "rgb(190 68 194)" }}
          >
            {/* <div>
              <img src={Ico} alt="" />
            </div> */}
            <div className="title">
              <div className="data">
                <Title level={5}> Total Expense</Title>
                <div className="count">
                  <Title level={2}> 4350</Title>
                </div>
                <p>(in Last year)</p>
              </div>

              <div>
                <img src={graph1} alt="" />
              </div>
            </div>
          </div>
          <div
            className="create"
            style={{ backgroundColor: "rgb(219 127 113)" }}
          >
            {/* <div>
              <img src={Ico} alt="" />
            </div> */}
            <div className="title">
              <div className="data">
                <Title level={5}> Total Profit</Title>
                <div className="count">
                  <Title level={2}> 4350</Title>
                </div>
                <p>(in Last year)</p>
              </div>

              <div>
                <img src={graph1} alt="" />
              </div>
            </div>
          </div>
          {/* <div className="create">
            <div className="title">
              <Title level={4}> Create New Product</Title>
            </div>
            <div className="data">
              <div className="numbers">
                <div>
                  <div className="title"></div>

                  <Button onClick={showModal}>Add Products</Button>
                </div>
              </div>

              <div className="image">
                <img src={Trophy} alt="" />
              </div>
            </div>
          </div> */}

          <Modal
            title="Create new Products"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
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
                onFinish={addNewProduct}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div className="form">
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter product name!",
                      },
                    ]}
                  >
                    <Input maxLength={65} placeholder="max 65 characters4" />
                  </Form.Item>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Please select product category!",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="electronics">Electronics</Option>
                      <Option value="books">Books</Option>
                      <Option value="mobiles">Mobiles</Option>
                      <Option value="homeAppliances">Home Appliances</Option>
                      <Option value="books">Books</Option>
                      <Option value="buety">Buety</Option>
                      <Option value="sports">Sports</Option>
                      <Option value="healthcare">Health care</Option>
                      <Option value="toys">Toys</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="form">
                  <Form.Item
                    label="Sub Category"
                    name="subCategory"
                    rules={[
                      {
                        required: true,
                        message: "Please select product Sub category!",
                      },
                    ]}
                  >
                   <Select>
                      <Option value="Music">Music</Option>
                      <Option value="Speaker">Speaker</Option>
                      <Option value="SmartPhone">SmartPhone</Option>
                      <Option value="KeypadPhone">KeypadPhone</Option>
                      <Option value="HeadPhone">HeadPhone</Option>
                      <Option value="beard">Beard</Option>
                      <Option value="teddy">Teddy</Option>
                    </Select>
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
                    name="stock"
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
                    label="Discription"
                    name="discription"
                    rules={[
                      {
                        required: true,
                        message: "Please enter product discription!",
                      },
                    ]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <div className="traders">
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
                      <input
                        type="file"
                        accept="image/*"
                        onChange={registerimage}
                      />
                    </Form.Item>
                  </div>
                </div>

                <Form.List
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
                  {(fields, { add, remove }, { errors }) => (
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
                </Form.List>

                <div className="button">
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Create Product
                    </Button>
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    {" "}
                    <Button type="primary" onClick={handleCancel}>
                      cancel
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Modal>

          <Modal
            title="Create new Products"
            open={stockeropen}
            onOk={stockerOk}
            onCancel={handleCancel}
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
                onFinish={addNewStocker}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div className="form">
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Stocker name!",
                      },
                    ]}
                  >
                    <Input maxLength={65} placeholder="max 65 characters4" />
                  </Form.Item>
                  <Form.Item
                    label="Owner"
                    name="owner"
                    rules={[
                      {
                        required: true,
                        message: "Please write owner name!",
                      },
                    ]}
                  >
                    <Input maxLength={65} placeholder="max 65 characters4" />
                  </Form.Item>
                </div>

                <div className="form">
                  <Form.Item
                    label="Phone Number"
                    name="contactNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Phone Number!",
                        // pattern: new RegExp(/^[0-9]+$/)
                      },
                    ]}
                  >
                    <InputNumber maxLength={10} minLength={10}></InputNumber>
                  </Form.Item>
                  <Form.Item
                    label="Place"
                    name="place"
                    rules={[
                      {
                        required: true,
                        message: "Please enter stocker place!",
                      },
                    ]}
                  >
                    <Input maxLength={65} placeholder="max 65 characters4" />
                  </Form.Item>
                </div>
                <div className="button">
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit" loading={spinning}>
                      Add new Stocker
                    </Button>
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    {" "}
                    <Button type="primary" onClick={handleCancel}>
                      cancel
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Actions;
