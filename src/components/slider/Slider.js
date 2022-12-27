import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, Col, Rate, Badge, Skeleton } from "antd";
import Countdown from "react-countdown";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { FaRupeeSign } from "react-icons/fa";
import "./slider.scss";
import { http } from "../../http-common";

const { Title } = Typography;

function Slider({ heading, timer, keyword }) {

  if (keyword) {
    keyword = keyword;
  } else {
    keyword = "";
  }
  const [productData, setProductData] = useState();

  useEffect(() => {
    http.get(`/products?${keyword}`).then((response) => {
      setProductData(response.data);
    });
  }, []);

  return (
    <div className="slider">
      <div className="header">
        <div className="time">
          <Title level={3}>{heading}</Title>
          {timer ? (
            <div className="timer">
              Ends in <Countdown date={Date.now() + 100000000} precision={3} />
            </div>
          ) : null}

          <div className="view">View All</div>
        </div>

        <hr></hr>

        <ScrollMenu
          arrowLeft={<div style={{ fontSize: "30px" }}>{" < "}</div>}
          arrowRight={<div style={{ fontSize: "30px" }}>{" > "}</div>}
        />
      </div>
      <div className="product-scroll">
        {productData && productData.products ? (
          <>
            {productData.products?.map((e) => {
              return (
                <>
                  <Col className="col" key={e._id}>
                    <Link
                      key={e._id}
                      className="productCard"
                      to={`/productDetails/${e._id}`}
                    >
                      <Badge.Ribbon text={`${e.offer}% off`} color="yellow">
                        <Card bordered={true}>
                          <div className="product-card">
                            <div>
                              {/* <img src={speaker} alt="" /> */}
                              {e.image.length > 0 ? (
                                <img src={e.image[0].url} alt="product Image" />
                              ) : (
                                <></>
                              )}
                              {/* <img src={e.image[0].url} alt="product Image" /> */}
                            </div>
                          </div>
                          <div className="deatails">
                            <Title level={5}>{e.name}</Title>
                            <span>
                              <Rate
                                allowHalf
                                disabled
                                defaultValue={e.ratings}
                              />{" "}
                            </span>
                            <span>({e.numberofReviews})</span>
                            <div className="rate">
                              <Title level={5}>
                                <FaRupeeSign />
                                <span className="ogPrice">{e.price}</span>{" "}
                                {e.amountPayable} Only
                              </Title>
                            </div>
                          </div>
                        </Card>
                      </Badge.Ribbon>
                    </Link>
                  </Col>
                </>
              );
            })}
          </>
        ) : (
          <>
            <Skeleton active />
          </>
        )}
      </div>
    </div>
  );
}

export default Slider;
