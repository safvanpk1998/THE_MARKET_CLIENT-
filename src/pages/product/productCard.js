import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, Col, Rate ,Badge,Result,Button } from "antd";
import { FaRupeeSign } from "react-icons/fa";
import "./productCard.scss";
import Loading from "../../components/loadin";
const { Title } = Typography;

function ProductCard({data,count,loading}) {
  return (
    <div className="PoductDetails">
      {data &&count>0?
      <div className="productWrapper">
      
        {data?.map((e) => {
          return (
            <>
             {loading ? (
      <Loading></Loading>
        ) : (
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
                      <img src={e.image[0].url} alt="product Image" />
                    </div>
                  </div>
                  <div className="deatails">
                    <Title level={5}>{e.name}</Title>
                    <span>
                      <Rate allowHalf disabled defaultValue={e.ratings} />{" "}
                    </span>
                    <span>({e.numberofReviews})</span>
                    <div className="rate">
                      <Title level={5}>
                        <FaRupeeSign /><span className="ogPrice">{e.price}</span>  {e.amountPayable} Only
                      </Title>
                    </div>
                  </div>
                </Card></Badge.Ribbon>
              </Link>
            </Col>
           )}
           
            </>
          );
        })}

       


      </div>:<Result
    title="No Products Found"
    extra={
      <Link to ="/">
      <Button type="primary" key="console">
       Back to Home
      </Button></Link>
    }
  />}
    </div>

  );
}

export default ProductCard;
