import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link,useParams } from "react-router-dom";
import dateFormat, { masks } from "dateformat";

import {
  Menu,
  Input,
  Space,
  Typography,
  InputNumber,
  Button,
  Rate,
  Progress,
  message,
  Tabs,
  Row,
  Col,
  Table,
  Form,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./review.scss";
import { clearProductError, createReview } from "../../../slices/productSlice";
import { getReview } from "../../../slices/productDetailSlice";

const { Title } = Typography;
const { TextArea } = Input;
function Review() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const reviewDetail = useSelector((state) => state.productDetails);
  const {reviewAdded} = useSelector((state) => state.products);
  const data = reviewDetail.reviewDetails.reviews
  const review=reviewDetail.productDetails.products

  const [rating, setRating] = useState(5);
  const onFinish = (values) => {
   
    values.rating=rating
    values.productId=id
    console.log("Success:", values);
    dispatch(createReview(values))

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (reviewAdded == true) {
    message.success("Thank You For Your Review");
   
    dispatch(clearProductError())
  }
  if (reviewAdded == false) {
    message.error("something went wrong! please try again");
    dispatch(clearProductError())
  }
  useEffect(() => {
    dispatch(getReview(id));
   
   
 
    
  }, [dispatch,id,reviewAdded]);
  return (
    <div className="review-component">
      <div className="post-a-review">
        {review?<div className="review">
          <Title level={4}> Avarage review </Title>
          <Title level={1}>{review.ratings.toFixed(2)}</Title>
          <Rate allowHalf disabled defaultValue={review.ratings} />
          <p className="no-of-review">{review.numberofReviews} reviews</p>
          <div className="progress">
            <div className="bar">
              <div className="title">
                <Title level={5}>5 star</Title>
              </div>
              <div className="graph">
                <Progress percent={30} />
              </div>
            </div>
          </div>
          <div className="progress">
            <div className="bar">
              <div className="title">
                <Title level={5}>4 star</Title>
              </div>
              <div className="graph">
                <Progress percent={40} />
              </div>
            </div>
          </div>
          <div className="progress">
            <div className="bar">
              <div className="title">
                <Title level={5}>3 star</Title>
              </div>
              <div className="graph">
                <Progress percent={18} />
              </div>
            </div>
          </div>
          <div className="progress">
            <div className="bar">
              <div className="title">
                <Title level={5}>2 star</Title>
              </div>
              <div className="graph">
                <Progress percent={5} />
              </div>
            </div>
          </div>
          <div className="progress">
            <div className="bar">
              <div className="title">
                <Title level={5}>1 star</Title>
              </div>
              <div className="graph">
                <Progress percent={7} />
              </div>
            </div>
          </div>
        </div>:<div>Loading</div>}
        
        <div className="post">
          <div>
            <div className="title">
              <Title level={5}>ADD A REVIEW</Title>
            </div>
         
            <div className="customer-rating">
              <p>Please Rate Your Experience</p>
              <Rate onChange={setRating} value={rating} />
            </div>
            <div className="textarea"></div>
            <div className="formdata">
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
              

                <Form.Item
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: "Please input your comment!",
                    },
                  ]}
                >
                  <TextArea
                    rows={6}
                    placeholder="Write your comment here..."
                    maxLength={180}
                  />
                </Form.Item>
               

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews">
        {data? <div className="count">
          <Title level={5}>{data.length} Reiew For This Product</Title>
        </div>:<div className="count">
          <Title level={5}>No Review Foun</Title>
        </div>}
        {data? <div className="review-card">
        {data?.map((e) => {
          return (
            <div className="data">
          <div className="details">
            <div className="avatar">
              <Avatar shape="circle" size={58} icon={<UserOutlined />} />
            </div>
            <div className="comment">
              <Rate allowHalf disabled defaultValue={e.rating} />
              <div className="user">
                by {e.name}
                <div className="vertical"></div>
               
                { dateFormat(e.createdAt, "paddedShortDate")}
              </div>
              {e.comment}
            </div>
          </div>
          </div>
          )})}
          
         
        </div>:<div>No review Found</div>}
        
       
      </div>
    </div>
  );
}

export default Review;
