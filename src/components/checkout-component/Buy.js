/**
 *
 * author: safvan
 *
 */

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  Input,
  Space,
  message,
  Typography,
  Button,
  Row,
  Col,
  Form,
  Modal,
  Radio,
  InputNumber,
} from "antd";

import { yellow } from "@mui/material/colors";

import { FaCheckCircle, FaRupeeSign } from "react-icons/fa";
import "./buy.scss";

import { http } from "../../http-common";

import { clearOrderError, createOrder } from "../../slices/orderSlice";

import { getProductDeatails } from "../../slices/productDetailSlice";

import LOGO from "../../assets/others/LOGO.png";

const { Title } = Typography;

function Buy() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { singleProduct, productDetails } = useSelector(
    (state) => state.productDetails
  );

  const { loading, err, ordercreated, order } = useSelector(
    (state) => state.order
  );

  let data = [];

  if (singleProduct) {
    data = productDetails.products;
  }

  const [value, setValue] = useState("direct");
  const [userDetails, setUserDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, quantity } = useParams();

  const onChange = (e) => {
    setValue(e.target.value);
  };
  //payment window

  const handleOk = async () => {

    if (value == "cashOnDelivery") {

      dispatch(createOrder(userDetails));

    } else {
      const {
        data: { key },
      } = await http.get("/getkey");
      const amount = userDetails.amountPayable * 100;
      const {
        data: { order },
      } = await http.post("/order/razorpayPayment", {
        amount,
      });

      const options = {
        key,
        amount: userDetails.amountPayable * 100,
        currency: "INR",
        name: "THE MARKET",
        description: "THE MARKET, ONE WORLD ONE MARKET",
        image: { LOGO },
        order_id: order.id,
        handler: async (response) => {
          userDetails.razorpay_order_id = response.razorpay_order_id;
          userDetails.razorpay_payment_id = response.razorpay_payment_id;
          userDetails.razorpay_signature = response.razorpay_signature;

          response.price = 25;
          response.amount = 1849;
          try {
            const { data } = await http.post("/order/new", userDetails);
            message.success("order placed Successfully");
            navigate(`/success/${id}`);
          } catch (error) {
            message.error(`something went wrong!,${error}`);
          }
        },
        prefill: {
          name: "Safvan P K",
          email: "Safvanpk414@gmail.com",
          contact: "9745801334",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#437814",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  let shippingPrice = "";
  if (data.amountPayable > 499) {
    shippingPrice = 0;
  } else {
    shippingPrice = 49;
  }
  let totalPrice = data.amountPayable * Number(quantity) + shippingPrice;

  const orderCrete = (values) => {
    const order = "";
    let status = "";

    if (value == "direct") {
      status = true;
    } else {
      status = false;
    }
    values.shippingInfo = {
      name: values.fname + " " + values.lastname,
      address: values.address,
      city: values.city,
      state: values.state,
      country: "india",
      pincode: values.pincode,
      phoneNumber: values.phoneNumber,
    };
    values.orderItems = {
      name: data.name,
      price: data.price,
      offer: data.offer,

      offerprize: data.amountPayable,
      quantity: quantity,
      image: data.image[0].url,
      product: data._id,
    };
    values.paymentInfo = {
      id: "sample",
      status: status,
      modeOfPayment: value,
    };
    values.itemPrice = data.amountPayable;
    values.shippingPrice = shippingPrice;
    values.amountPayable = totalPrice;
    setUserDetails(values);
    showModal();
  };
  if (ordercreated == true) {
    message.success("order placed Successfully");
    navigate(`/success/${id}`);
    dispatch(clearOrderError());
  }
  if (err) {
    message.error("something went wrong! please try again");
    dispatch(clearOrderError());
  }
  const onFinishFailed = (errorInfo) => {
  };
  useEffect(() => {
    dispatch(getProductDeatails(id));
  }, [dispatch, loading, order]);

  return (
    <>
      {singleProduct ? (
        <div className="buy-component">
          <div className="title">
            <Title level={1}> Checkout </Title>
          </div>
          <div className="item">
            <p>
              {" "}
              <span className="tick">
                <FaCheckCircle />
              </span>
              "{data.name}" has been added to your Cart
            </p>{" "}
            <Link to="/cart">
              {" "}
              <Button> View Cart</Button>
            </Link>
          </div>
          <div className="payment">
            <div className="address">
              <Title level={3}> Billing Details </Title>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 24,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={orderCrete}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Row gutter={24}>
                  <Col lg={14} md={12} sm={24}>
                    <Row gutter={24}>
                      <Col lg={12} md={24} sm={12} xs={24}>
                        <Form.Item
                          label="First Name"
                          name="fname"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={24} sm={12} xs={24}>
                        <Form.Item
                          label="Last Name"
                          name="lastname"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Email!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                        },
                        { type: "email" },
                      ]}
                    >
                      <Input
                        rows={6}
                        placeholder="Write your Email here..."
                        maxLength={180}
                      />
                    </Form.Item>
                    <Form.Item
                      label="State"
                      name="state"
                      rules={[
                        {
                          required: true,
                          message: "Please input your State!",
                        },
                      ]}
                    >
                      <Input
                        rows={6}
                        placeholder="Write your State here..."
                        maxLength={180}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Town/city"
                      name="city"
                      rules={[
                        {
                          required: true,
                          message: "Please input your City!",
                        },
                      ]}
                    >
                      <Input
                        rows={6}
                        placeholder="Write your city here..."
                        maxLength={180}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Street Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your address!",
                        },
                      ]}
                    >
                      <Input
                        rows={6}
                        placeholder="Write your address here..."
                        maxLength={180}
                      />
                    </Form.Item>
                    <Row gutter={24}>
                      <Col lg={12} md={24} sm={12} xs={24}>
                        <Form.Item
                          label="Phone Number"
                          name="phoneNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please input your PhoneNumber!",
                            },
                          ]}
                        >
                          <InputNumber minLength={10} maxLength={10} />
                        </Form.Item>
                      </Col>{" "}
                      <Col lg={12} md={24} sm={12} xs={24}>
                        <Form.Item
                          label="Pincode"
                          name="pincode"
                          rules={[
                            {
                              required: true,
                              message: "Please input your pincode!",
                            },
                          ]}
                        >
                          <InputNumber minLength={5} maxLength={8} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={10} md={12} sm={24}>
                    <Title level={3}> Your Order </Title>
                    <div className="payment-method">
                      <div className="table">
                        <div className="left">
                          <Title level={3}> Product </Title>
                        </div>
                        <div className="right">
                          <Title level={3}> Sub Total </Title>
                        </div>
                      </div>
                      <hr />
                      <div className="table">
                        <div className="left">{data.name}</div>
                        <div className="right">
                          <FaRupeeSign size={10}></FaRupeeSign> {data.price}
                        </div>
                      </div>
                      <div className="table">
                        <div className="left">Quantity</div>
                        <div className="right">{quantity}</div>
                      </div>
                      <div className="table">
                        <div className="left">Discount</div>
                        <div className="right">{data.offer}%</div>
                      </div>
                      <div className="table">
                        <div className="left">Shipping Cost</div>
                        {data.amountPayable > 4000 ? (
                          <div className="right">Free Shipping</div>
                        ) : (
                          <div className="right">
                            {" "}
                            <FaRupeeSign size={10}></FaRupeeSign>
                            {shippingPrice}
                          </div>
                        )}
                      </div>
                      <div className="table">
                        <div className="left">
                          <Title level={3}> Total </Title>
                        </div>
                        <div className="right">
                          <Title level={3}>
                            <FaRupeeSign size={17}></FaRupeeSign> {totalPrice}{" "}
                          </Title>
                        </div>
                      </div>
                      <Form.Item name="paymentMethod">
                        <Radio.Group
                          onChange={onChange}
                          value={value}
                          defaultValue="direct"
                        >
                          <Space direction="vertical">
                            <Radio value="direct"> Direct bank Transfer</Radio>
                            <Radio value="cashOnDelivery">
                              Cash on Delivery
                            </Radio>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div className="note">
                      Your personal data will be used to process your order,
                      support your experience throughout this website.
                    </div>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <Modal
            title="Please Confirm your Details"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            style={{
              top: 20,
              backgroundColor: yellow,
            }}
          >
            <div className="paymentModal">
              <div>
                <Title level={5}>Shipping Info</Title>
                <div className="table">
                  <div className="left">Name</div>
                  <div className="right">{userDetails.fname}</div>
                </div>
                <div className="table">
                  <div className="left">Phone Number</div>
                  <div className="right">{userDetails.phoneNumber}</div>
                </div>
                <div className="table">
                  <div className="left">Address</div>
                  <div className="right">
                    {userDetails.address} ,{userDetails.city} ,
                    {userDetails.state} ,India, {userDetails.city} <br />
                    pin:{userDetails.pincode}
                  </div>
                </div>

                <Title level={5}>Product Info</Title>
                <div className="table">
                  <div className="left">Product</div>
                  <div className="right">{data.name}</div>
                </div>
                <div className="table">
                  <div className="left">price</div>
                  <div className="right">
                    <FaRupeeSign size={10}></FaRupeeSign> {data.price}
                  </div>
                </div>
                <div className="table">
                  <div className="left">Quantity</div>
                  <div className="right">{quantity}</div>
                </div>
                <div className="table">
                  <div className="left">Discount</div>
                  <div className="right">{data.offer}%</div>
                </div>
                <div className="table">
                  <div className="left">
                    <Title level={3}> Total </Title>
                  </div>
                  <div className="right">
                    <Title level={3}>
                      <FaRupeeSign size={17}></FaRupeeSign> {totalPrice}{" "}
                    </Title>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Buy;
