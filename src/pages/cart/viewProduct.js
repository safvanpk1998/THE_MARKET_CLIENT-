import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography, Button, message, Steps } from "antd";
import Header from "../../components/layout-component/header";
import {
  clearOrderError,
  getSingleOrder,
  updateOrder,
} from "../../slices/orderSlice";
import "./viewProduct.scss";
import Footer from "../../components/layout-component/footer";

function ViewProduct() {
  const dispatch = useDispatch();
  const description = "This is a description.";

  const { id } = useParams();
  const { Title } = Typography;
  const { Step } = Steps;
  const { singleOrder, orderStatus } = useSelector((state) => state.order);
  const data = singleOrder.order;
  const productDetail = useSelector((state) => state.productDetails);
  const product = productDetail.productDetails.products;

  const cancelOrder = () => {
    let obj = {
      id: id,
      status: "Cancelled",
    };
    dispatch(updateOrder(obj));
  };
  if (orderStatus == true) {
    message.warning("Order cancelled");
    dispatch(clearOrderError());
  }
  if (orderStatus == false) {
    message.error("Some thing went wrong! Please try again");
    dispatch(clearOrderError());
  }
  let stepstate = "";
  let step = 1;

  if (data && data.orderStatus == "Cancelled") {
    stepstate = "error";
  } else {
    stepstate = "success";
  }

  if (data && data.orderStatus == "Processing") {
    step = 1;
  }
  if (data && data.orderStatus == "Dispatched") {
    step = 2;
  }
  if (data && data.orderStatus == "Shipped") {
    step = 3;
  }
  if (data && data.orderStatus == "Delivered") {
    step = 4;
  }

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);
  return (
    <>
      <Header></Header>
      <div className="viewProduct">
        {/* 
        <div className="heading">
        <Title level={4}>Order Details</Title>

        </div> */}
        {singleOrder && data ? (
          <div className="details">
            <div className="image">
              <img src={data.orderItems.image} alt="product Image" />
            </div>
            <div className="order-Details">
              <div className="steps">
                <div className="title ">
                  <Title level={4}>{data.orderItems.name}</Title>
                </div>
                <div className="bigScreen">
                  <Steps
                    current={step}
                    status={stepstate}
                    labelPlacement="vertical"
                  >
                    <Step title="Order Recieved" />
                    <Step title="Item Packed" />
                    <Step title="Item Shipped" />
                    <Step title="Order deliverd" />
                  </Steps>
                  <div className="product">
                    <div>
                      sold By :{" "}
                      <span className="data"> New Delhi Collections</span>
                    </div>
                    <div>
                      Expected Delivery Date:{" "}
                      <span className="data">20-10-2022</span>
                    </div>
                  </div>
                  <div className="product">
                    <div>
                      Item Price :{" "}
                      <span className="data"> {data.itemPrice}</span>
                    </div>
                    <div>
                      quantity:{" "}
                      <span className="data">{data.orderItems.quantity}</span>
                    </div>
                  </div>

                  <div className="total">
                    <Title level={4}>
                      Total :{" "}
                      <span className="data"> {data.amountPayable}</span>
                    </Title>
                    <div className="button">
                      <div className="buy">
                        <Link to={`/${product.category}`}>
                          <Button>Buy More</Button>
                        </Link>
                      </div>
                      <div className="cancel">
                        <Button onClick={cancelOrder}>Cancel Order</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile">
            <div className="wrapper">
                  <div className="product">
                  

                    
                    <div>
                      sold By :{" "}
                      <span className="data"> New Delhi Collections</span>
                    </div>
                    <div>
                      Expected Delivery Date:{" "}
                      <span className="data">20-10-2022</span>
                    </div>
                  </div>
                  <div className="product">
                    <div>
                      Item Price :{" "}
                      <span className="data"> {data.itemPrice}</span>
                    </div>
                    <div>
                      quantity:{" "}
                      <span className="data">{data.orderItems.quantity}</span>
                    </div>
                  </div></div>
                  <Steps
                    current={step}
                    progressDot
                    direction="vertical"
                    status={stepstate}
                    labelPlacement="vertical"
                  >
                    <Step title="Order Recieved" />
                    <Step title="Item Packed" />
                    <Step title="Item Shipped" />
                    <Step title="Order deliverd" />
                  </Steps>

                  <div className="total">
                    <Title level={4}>
                      Total :{" "}
                      <span className="data"> {data.amountPayable}</span>
                    </Title>
                    <div className="button">
                      <div className="buy">
                        <Link to={`/${product.category}`}>
                          <Button>Buy More</Button>
                        </Link>
                      </div>
                      <div className="cancel">
                        <Button onClick={cancelOrder}>Cancel Order</Button>
                      </div>
                    </div>
                  </div>
                 
                </div>
          </div>
        ) : (
          <div>No product found</div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default ViewProduct;
