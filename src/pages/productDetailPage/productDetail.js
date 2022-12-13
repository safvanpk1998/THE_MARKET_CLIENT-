import React from 'react'
import Header from '../../components/layout-component/header'
import BasicDetails from '../../components/Product-deatail Component/BasicDetails'
import Footer  from "../../components/layout-component/footer"
import Slider from '../../components/slider/Slider'

function productDetail() {
  return (
    <div>
        <Header></Header>
        <BasicDetails></BasicDetails>
        <Slider></Slider>
        <Slider></Slider>
        <Footer></Footer>

       

    </div>
  )
}

export default productDetail