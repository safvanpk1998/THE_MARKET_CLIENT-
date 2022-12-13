import React from 'react'
import "./ProductBanner.scss";
import ad from "../../assets/ad/shaveadd.png";
import adh from "../../assets/ad/shavingad.png"
function Advertisement() {
  return (
    <div className='product-banner'>
        <div className='poster'>
           <img src={ad} alt="" />
            
        </div>
        <div className='hor-poster'>
           <img src={adh} alt="" />
            
        </div>
    </div>
  )
}

export default Advertisement