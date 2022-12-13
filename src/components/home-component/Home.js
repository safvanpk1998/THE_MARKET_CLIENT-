import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BackTop } from 'antd';
import Banner from "../banner-components/Banner";
import Policy from "../banner-components/Policy";
import Homeposter from "../banner-components/posters/Home-poster";
import Header from "../layout-component/header";
import Product from "../product-component/product";
import ProductDetails from "../product-component/Product-Details";
import Slider from "../slider/Slider";
import Timer from "../timer/timer";
import Footer from "../layout-component/footer"
function Home() {
  return (
    <div>
  
        <Header></Header>
        <Banner></Banner>
        <Policy></Policy>
        <Homeposter></Homeposter>
        <Slider heading="Deal Of The Day" timer={true} ></Slider>
        <Slider heading="Electronics $ Mobiles" keyword={"apple"}></Slider>
        <Slider heading="Home & Kitchen Essentials" keyword={"nokia"}></Slider>
        <Slider heading="Sports, Healthcare & more" keyword={"Electronics"}></Slider>
        <Slider heading="Beauty, Food, Toys & more"></Slider>
      
        <Footer></Footer>
        

        
        
       
    
     

    </div>
  );
}

export default Home;
