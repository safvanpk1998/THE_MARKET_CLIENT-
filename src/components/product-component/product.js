import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { ReactStars } from "react-star-rating-component";
import { useSelector, useDispatch } from "react-redux";
import { Button, Checkbox, Form, Input } from "antd";
import {
  createProduct,
  getProduct,
  
} from "../../slices/productSlice";

function ProductAdd() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const data = products.products;

  const onFinish = (values) => {
    let data = {
      ...values,
      image: {
        public_id: "sample image",
        url: "sampleurl",
      },
    };
  
    if (data) {
      dispatch(createProduct(data));
    }
  };
  const onFinishFailed = (errorInfo) => {
  
  };
  useEffect(() => {
    dispatch(getProduct());
    // dispatch(getProductDeatails("632190f1c091d8c6c17e00087"));
  }, [dispatch]);



  return (
    <div>
      <Link className="productCard">
        <h1>huawei31</h1>
        <p>the best smart phone in affordable pay range</p>
        <h2>price:28000</h2>
        <div></div>
      </Link>

      <div>
        {data?.map((e) => {
          return (
            <div key={e._id}>
              <Link
                key={e._id}
                className="productCard"
                to={`/product/${e._id}`}
              >
                <p>{e.name}</p>
                <p>{e.discription}</p>
                <p>{e.price}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="product"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {}
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Discription"
          name="discription"
          rules={[
            {
              required: true,
              message: "Please input  discription!",
            },
          ]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductAdd;
