import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  message,
  Typography,
  Button,
  Rate,
  Popconfirm,
} from "antd";
import { FaTrash } from "react-icons/fa";
import Header from "../../components/layout-component/header";
import "./wishList.scss";
import Footer from "../../components/layout-component/footer";
import {
  clearWishListError,
  deleteWishList,
  getMyWishList,
} from "../../slices/wishListSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const { Title } = Typography;

  const { wishList, itemdeleted } = useSelector(
    (state) => state.wishList
  );
  const product = wishList.order;


  if (itemdeleted == "deleted") {
    message.warning("Order cancelled");
    dispatch(clearWishListError());

    window.location.reload();
  }
  if (itemdeleted == "error") {
    message.error("5Some thing went wrong! Please try again");
    dispatch(clearWishListError());
  }

  const deleteItem = (_id) => {
    dispatch(deleteWishList(_id));
  };
  useEffect(() => {
    dispatch(getMyWishList());
  }, [dispatch]);
  return (
    <>
      <Header></Header>
      <div className="wishList-Component">
        <div className="viewProduct">
          {/* 
        <div className="heading">
        <Title level={4}>Order Details</Title>

        </div> */}
          {/* {orderDetail.singleOrder && data ? ( */}
          {wishList.order &&
            product?.map((e) => {
              return (
                <>
                  <div className="details">
                    <div className="image">
                      <img src={e.product.image[0].url} alt="product Image" />
                    </div>
                    <div className="order-Details">
                      <div className="steps">
                        <div className="title ">
                        <div className="mobileScreen">
                      <img src={e.product.image[0].url} alt="product Image" />
                    </div>
                          <Title level={4}>{e.product.name}</Title>
                          <div>
                            <div className="count">
                              <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => deleteItem(e._id)}
                              >
                                {" "}
                                <FaTrash size={18} color="rgb(9 81 109);" />
                              </Popconfirm>
                            </div>
                          </div>
                        </div>
                        {/* <Steps current={2} status={stepstate} labelPlacement="vertical">
                  <Step title="Order Recieved" />
                  <Step title="Item Packed" />
                  <Step title="Item Shipped" />
                  <Step title="Order deliverd" />
                </Steps> */}
                        <div className="product">
                          <div>
                            sold By :{" "}
                            <span className="data"> New Delhi Collections</span>
                          </div>
                          <div>
                            {e.product.stock > 0 ? (
                              <div>
                                Status: <span className="data">In Stock</span>{" "}
                              </div>
                            ) : (
                              <div>
                                Status:{" "}
                                <span className="data">Out Of Stock</span>{" "}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="product">
                          <div>
                            Item Price :{" "}
                            <span className="data">{e.product.price}</span>
                          </div>
                          <div>
                            quantity: <span className="data">1</span>
                          </div>
                        </div>

                        <div className="total">
                          <div>
                            exclusive Offer :{" "}
                            <span className="data">{e.product.offer}%</span>
                          </div>
                          <Title level={4}>
                            Total :{" "}
                            <span className="data">
                              {e.product.amountPayable}
                            </span>
                          </Title>
                        </div>
                        <div className="product">
                          <span>
                            <Rate
                              allowHalf
                              disabled
                              defaultValue={e.product.ratings}
                            />{" "}
                            ({e.product.numberofReviews} )
                          </span>

                          <div className="button">
                            <div className="buy">
                              {/* <Link to={`/${product.category}`}> */}
                              <Link
                                to={`/product/productdetails/checkout/${e.product._id}/1`}
                              >
                                {" "}
                                <Button>Buy</Button>
                              </Link>
                              {/* </Link> */}
                            </div>
                            <div className="cancel">
                              <Link to={`/productDetails/${e.product._id}`}>
                                <Button>View Product</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <hr />
                </>
              );
            })}
          {/* ) : (
          <div>No product found</div>
        )} */}

          {/* {product.length?<></>:<><Empty></Empty></>} */}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Wishlist;
