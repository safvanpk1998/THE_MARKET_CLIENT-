import React from 'react'
import Buy from '../../components/checkout-component/Buy'
import Footer from '../../components/layout-component/footer';
import Header from '../../components/layout-component/header'
import "./checkout.scss";

function Checkout() {
  return (
  <div className='checkout-component'>
    <Header></Header>
    <div className='body'>
    <Buy></Buy>

    </div>
    <Footer></Footer>
    

  </div>
  )
}

export default Checkout