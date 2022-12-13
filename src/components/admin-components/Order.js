import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Modal,
  Form,
} from "antd";

import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";

import {
  deleteOrder,
  getAllOrderDatas,
  updateOrderStatus,
} from "../../utils/adminApi";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function Order() {
  const [current, setCurrent] = useState(1);

  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(10);

  //delete order

  const eliminateOrder = async (data) => {
    let response = await deleteOrder(data._id);

    if (response.error) {
      message.error("Something went wrong");
    } else {
      message.success("order deleted");
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };

  const [order, setorder] = useState();

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const [orderData, setOrderData] = useState([]);

  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //order role editer model

  const updateStatus = async (data) => {
    let id = order._id;
    setSpinning(true);
    data.paymentInfo = {
      payment: data.payment,
    };
    let response = await updateOrderStatus(id, data);
    if (response.error) {
      message.error("Something went wrong");
      statusOk();
      setSpinning(false);
      form.resetFields();
    } else {
      setSpinning(false);
      message.success("Order Updated Successfully");
      statusOk();
      form.resetFields();

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };

  const showstatusModal = (data) => {
    console.log(data);
    setorder(data);
    setStatusModalOpen(true);
  };

  const statusOk = () => {
    setStatusModalOpen(false);
  };

  const statusCancel = () => {
    setStatusModalOpen(false);
  };
  const handlePage = (current, limit) => {
    setCurrent(current);
    setLimit(limit);
    console.log(limit, current, "current page");
    getAllOrder(current, limit);
  };

  const orderColumns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "id",
      fixed: "left",
      width: 200,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "id",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "id",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "id",
      width: 150,
    },
    {
      title: "Offer",
      dataIndex: "offerprice",
      key: "id",
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "id",
      width: 150,
    },
    {
      title: "Amount Payble",
      dataIndex: "amountPayble",
      key: "id",
      width: 150,
    },
    {
      title: "Contact Number",
      dataIndex: "mobileNumber",
      key: "id",
      width: 150,
    },

    {
      title: "Mode of Payment",
      dataIndex: "modeOfPayment",
      key: "id",
      width: 150,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "id",
      width: 250,
    },

    {
      title: "Action",
      fixed: "right",
      dataIndex: "data",
      key: "data,",
      width: 100,
      render: (data) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Link>
              <FaEdit
                onClick={() => {
                  showstatusModal(data);
                }}
              ></FaEdit>
            </Link>
          </Tooltip>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => eliminateOrder(data)}
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
  const getAllOrder = async (current, limit) => {
    const response = await getAllOrderDatas(current, limit);
    console.log(response, "cdeug");
    if (response.error) {
      setStatusModalOpen(false);
      message.error("Something went wrong");
    } else {
        setTotal(response.filterdOrderCount)
      setOrderData(
        response.orders.map((data) => ({
          name: data.orderItems.name,
          user: data.shippingInfo.name || "safvan",
          address:
            data.shippingInfo.address +
            "," +
            data.shippingInfo.city +
            ", " +
            data.shippingInfo.state +
            ",India,  " +
            data.shippingInfo.pincode,
          mobileNumber: 987456321,
          price: data.orderItems.price || 0,
          quantity: data.orderItems.quantity,
          offerprice: data.orderItems.offerprize || 0,
          amountPayble: data.amountPayable,
          orderStatus: data.orderStatus,
          role: data.role,
          modeOfPayment: data.paymentInfo.modeOfPayment,
          id: data._id,
          data: data,
        }))
      );
    }
  };

  useEffect(() => {
    getAllOrder(current, limit);
  }, []);

  return (
    <div>
      <div>
        <Table
          dataSource={orderData}
          columns={orderColumns}
          pagination={{
            pageSize: limit,
            current: current,
            total: total,
            onChange: (current, limit) => {
              handlePage(current, limit);
            },
          }}
          scroll={{ x: 1500 }}
        />
      </div>

      <Modal
        title="Update delivery Status"
        open={statusModalOpen}
        onOk={statusOk}
        onCancel={statusCancel}
        footer={null}
        width={600}
      >
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
          onFinish={updateStatus}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            Name:safvan
            {order ? (
              <div> total Amount Payble: {order.amountPayable} </div>
            ) : null}
          </div>
          <Form.Item
            label="Pyament Status"
            name="payment"
            rules={[
              {
                required: true,
                message: "Please select Payment status!",
              },
            ]}
          >
            <Select style={{ width: "calc(85%)" }}>
              <Option value="Success">Recieved</Option>
              <Option value="Fail">Not Payed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Order Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please select status!",
              },
            ]}
          >
            <Select style={{ width: "calc(85%)" }}>
              <Option value="Processing">Processing</Option>
              <Option value="Dispatched">Dispatched</Option>
              <Option value="Shipped">Shipped</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
          <div className="create-product">
            <div className="button">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" loading={spinning}>
                  Update Status
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                {" "}
                <Button type="primary" onClick={statusCancel}>
                  cancel
                </Button>
              </Form.Item>
            </div>{" "}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Order;
