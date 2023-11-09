import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Card,
  Col,
  Row,
  Rate,
  Badge,
  Empty,
  Button,
  Drawer,
} from "antd";

import { FaFilter } from "react-icons/fa";
import Header from "../../components/layout-component/header";
import Filter from "../filter/Filter";
import Advertisement from "../pagebanner/ProductBanner";
import Slider from "../../components/slider/Slider";

import "./product.scss";
import ProductCard from "./productCard";
import Footer from "../../components/layout-component/footer";
import { getProduct } from "../../slices/productSlice";
import Loading from "../../components/loadin";

function Product({ section }) {
  const [subCategory, setSubCategory] = useState("");
  const [ratings, setRatings] = useState("");
  const [brand, setbrand] = useState("");
  const [amountPayable, setAmountPayable] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { products, filteredProductsCount, productLoading } = useSelector(
    (state) => state.products
  );
  const data = products;

  const currentPage = "";
  const price = "";
  let category = "";
  let path = "";

  if (section) {
    category = section;
    console.log(category);
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // dispatch(getProduct(category));
  }, [dispatch]);
  return (
    <div className="product-component">
      <Header></Header>

      <>
       
          <div className="pages">
            <div className="filter-withscreen">
              <Filter category={category}></Filter>
            </div>

            <div className="productBanner">
              <Advertisement></Advertisement>
            </div>
            <div className="filter-model">
              {" "}
              <Button onClick={showDrawer}>
                Apply Filters<FaFilter></FaFilter>
              </Button>
            </div>
            <ProductCard
              data={data}
              count={filteredProductsCount}
              loading={productLoading}
            ></ProductCard>
          </div>
      
      </>
      <Footer></Footer>

      <Drawer
        zIndex={10000}
        width={280}
        onClose={onClose}
        closable={false}
        open={open}
        placement="right"
      >
        <div className="drower">
          <div></div>
          <Filter category={category}></Filter>
        </div>
      </Drawer>
    </div>
  );
}

export default Product;
