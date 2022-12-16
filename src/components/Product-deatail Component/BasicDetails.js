import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Menu,
  Input,
  Space,
  Typography,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Empty,
  Table,
  Skeleton,
  message,
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { FaRupeeSign } from "react-icons/fa";
import { GlassMagnifier, MagnifierContainer } from "react-image-magnifiers";
import jbl from "../../assets/images/jbl.png";
import "./basicDetails.scss";
import Review from "./review/review";
import Slider from "../slider/Slider";
import { getProduct } from "../../slices/productSlice";
import { getProductDeatails } from "../../slices/productDetailSlice";
import {
  createNewWishList,
  clearWishListError,
} from "../../slices/wishListSlice";
const { Title } = Typography;

function BasicDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const productDetail = useSelector(
    (state) => state.productDetails.productDetails
  );
  const data = productDetail.products;
  const { wishList, loading, itemdeleted, productadded, err } = useSelector(
    (state) => state.wishList
  );

  const onChange = (value) => {};
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 3,
    },
  });
  if (productadded == true) {
    message.success("Product Added To WishList");

    dispatch(clearWishListError());
  }
  if (productadded == false) {
    message.error(err.message);

    dispatch(clearWishListError());
  }
  // if (err) {
  //   message.error("something went wrong! please try again");
  // }

  const addtoWishList = () => {
    dispatch(createNewWishList(id));
  };
  const [count, setCount] = useState(1);
  const add = () => {
    let newcount = count + 1;
    if (newcount > data.stock) {
      newcount = data.stock;
    }
    setCount(newcount);
  };
  const minus = () => {
    let newcount = count - 1;
    if (newcount < 0) {
      newcount = 0;
    }
    setCount(newcount);
  };
  const dataSource = [
    {
      key: "1",
      name: "Model",
      Value: 2022.5,
    },
    {
      key: "2",
      name: "Color",
      Value: "Black",
    },
    {
      key: "2",
      name: "Color",
      Value: "Black",
    },
    {
      key: "2",
      name: "Color",
      Value: "Black",
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "Value",
      key: "Value",
    },
  ];
  useEffect(() => {
    // dispatch(getProduct(id));
    dispatch(getProductDeatails(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  return (
    <>
      <div className="BasicDetails">
        {productDetail && data ? (
          <div className="header">
            <div className="title">
              <Title level={3}>{data.name}</Title>
              <div className="info">
                <div className="data">
                  <p>
                    <span className="brand"> Brand : </span>
                    <span className="name"> {data.brand} </span>
                  </p>
                  <div className="vertical"></div>
                </div>
                <div className="data">
                  <p>
                    <span>
                      <Rate allowHalf disabled defaultValue={data.ratings} />{" "}
                    </span>
                    <span>{`(${data.numberofReviews} Reviews)`}</span>
                  </p>
                  <div className="vertical"></div>
                </div>
                <div className="data">
                  <p>
                    <span>SKU :</span>
                    <span className="name">CD 7824593651</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="add">
              <div className="count">
                <Button.Group>
                  <Button onClick={minus} icon={<MinusOutlined />} />

                  <Title level={3}>{count}</Title>
                  <Button onClick={add} icon={<PlusOutlined />} />
                </Button.Group>
              </div>
              <div className="buy">
                <div className="cart-button">
                  <Button onClick={addtoWishList}> add to cart</Button>
                </div>

                <Link to={`/product/productdetails/checkout/${id}/${count}`}>
                  {" "}
                  <Button>Buy</Button>
                </Link>
              </div>
            </div>
            <div className="info-medium">
              <div className="data">
                <p>
                  <span className="brand"> Brand : </span>
                  <span className="name"> {data.brand} </span>
                </p>
                <div className="vertical"></div>
              </div>
              <div className="data">
                <p>
                  <span>
                    <Rate allowHalf disabled defaultValue={data.ratings} />{" "}
                  </span>
                  <span>{` (${data.numberofReviews}Reviews)`}</span>
                </p>
                <div className="vertical"></div>
              </div>
              <div className="data">
                <p>
                  <span>SKU :</span>
                  <span className="name">CD 7824593651</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Skeleton active />
          </>
        )}
        <hr></hr>

        <div className="summary">
        {productDetail && data ? (
          <div className="image">
            <div className="pics"></div>
            <div className="enlarge">
              {productDetail && data&&data.image.length > 0 ? (
                <MagnifierContainer>
                  <GlassMagnifier
                    imageSrc={data.image[0].url}
                    //  imageSrc={e.image[0].url}

                    magnifierSize="80%"
                    allowOverflow="false"
                    style={{ width: "80%" }}
                  />
                </MagnifierContainer>
              ) : (
                <>image not found</>
              )}
            </div>
            <div className="title-Screen">
              <div className="rate">
                <Title level={3}>
                  <FaRupeeSign size={20}></FaRupeeSign> {data.amountPayable}
                </Title>
                <p className="dashed">
                  <FaRupeeSign size={13}></FaRupeeSign>{" "}
                  <span className="old-value"> {data.price} </span>
                </p>
                <Title level={5}>( {data.offer}%off )</Title>
              </div>

              <div className="dealer">
                <p>
                  <span className="brand"> Sold By : </span>
                  <span className="name"> {data.soldBy.name}</span>
                  <div className="vertical"></div>
                  <span className="brand"> Status : </span>
                  <span className="name">
                    {" "}
                    {data.stock > 0 ? "In stock" : "Out Of Stock"}{" "}
                  </span>
                </p>
                <p>Inclusive of all taxes</p>
              </div>
            </div>
          </div>): (
            <>
              <Skeleton active />
            </>
          )}
          {productDetail && data ? (
            <div className="details">
              <div className="title">
                <div className="rate">
                  <Title level={3}>
                    <FaRupeeSign size={20}></FaRupeeSign> {data.amountPayable}
                  </Title>
                  <p className="dashed">
                    <FaRupeeSign size={13}></FaRupeeSign>{" "}
                    <span className="old-value"> {data.price} </span>
                  </p>
                  <Title level={5}>( {data.offer}%off )</Title>
                </div>

                <div className="dealer">
                  <p>
                    <span className="brand"> Sold By : </span>
                    <span className="name"> {data.soldBy.name}</span>
                    <div className="vertical"></div>
                    <span className="brand"> Status : </span>
                    <span className="name">
                      {" "}
                      {data.stock > 0 ? "In stock" : "Out Of Stock"}{" "}
                    </span>
                  </p>
                  <p>Inclusive of all taxes</p>
                </div>
              </div>
              <hr />
              <div className="list">
                <ul class="a">
                  {data.specs?.map((e) => {
                    return <li>{e}</li>;
                  })}

                  {/* <li>Free from the confines of wires and chords</li>
              <li>20 hours of portable capabilities</li>
              <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
              <li>3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li> */}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Skeleton active />
            </>
          )}
        </div>
        <div className="tabs">
          {productDetail && data ? (
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Discription" key="1">
                {data.discription ? (
                  <div>
                    <div>
                      <Title level={4}>
                        Embodying the Raw, Wayward Spirit of Rock ‘N’ Roll
                      </Title>
                    </div>
                    <div>
                      <p>{data.discription}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Empty />
                  </div>
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Specifications" key="2">
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={tableParams.pagination}
                />
                ;
              </Tabs.TabPane>
              <Tabs.TabPane tab="Reviews" key="3">
                <Review></Review>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Vendor Info" key="4">
                <div className="vendor">
                  <Title level={4}>Vendor Information</Title>
                </div>
                {productDetail && data ? (
                  <div className="vendor">
                    <p>
                      {" "}
                      <span className="criteria"> Store Name : </span>New Delhi
                      Collections{" "}
                    </p>
                    <p>
                      {" "}
                      <span className="criteria"> Vendor : </span> New Delhi
                      Collections
                    </p>
                    <p>
                      {" "}
                      <span className="criteria"> Address: </span> 335 Orchard ,
                      Navi Mumbai
                    </p>
                    <p>{`${data.ratings} rating From ${data.numberofReviews} Users`}</p>
                    <Rate allowHalf disabled defaultValue={data.ratings} />{" "}
                  </div>
                ) : (
                  <>
                    <Empty></Empty>
                  </>
                )}
              </Tabs.TabPane>
            </Tabs>
          ) : (
            <>
              <Skeleton active />
            </>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default BasicDetails;
