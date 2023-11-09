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
        <Slider heading="Deal Of The Day" timer={true} keyword={`offer[gte]=45&offer[lte]=75&ratings[gte]=4`}></Slider>
        <Slider heading="Electronics" keyword={"category=electronics"}></Slider>
        <Slider heading="Mobiles" keyword={"category=mobiles"}></Slider>
        <Slider heading="Home & Kitchen Essentials" keyword={"category=homeAppliances"}></Slider>
        <Slider heading="Sports, Healthcare & more" keyword={"category=healthcare&category=sports"}></Slider>
        <Slider heading="Beauty, Food, Toys & more" keyword={"category=buety&category=toys"}></Slider>
      
        <Footer></Footer>
        

        
        
       
    
     

    </div>
  );
}

export default Home;
