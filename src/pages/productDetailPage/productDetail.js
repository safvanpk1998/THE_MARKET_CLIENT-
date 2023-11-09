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
        <Slider keyword={`offer[gte]=31&offer[lte]=75&ratings[gte]=0`}></Slider>
        <Slider keyword={`offer[gte]=0&offer[lte]=30&ratings[gte]=0`}></Slider>
        <Footer></Footer>

       

    </div>
  )
}

export default productDetail