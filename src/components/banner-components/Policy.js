

/**
 * 
 * author: safvan
 * 
 */

import React,{useState} from "react";
import { FaRocket ,FaUndoAlt ,FaWallet,FaComments} from "react-icons/fa";
import { Typography } from "antd";
import "./policy.scss";
const { Title } = Typography;

function Policy() {
  const [fix, SetFix] = useState();
  const setFixed=()=>{
    if(window.innerWidth < 600){
      SetFix(true)
    }
    else{
      SetFix(false)
    }
  }
  window.addEventListener("resize",setFixed)
  return (
    <div className="policy-component">
      <div className="info">
        <div className="data">
          <div className="icon">
            <FaRocket size={30} color="#ecce11"></FaRocket>
          </div>
          <div className="details">
            <Title level={4}>Free Delivery</Title>

            <p>For all order over Rs 499</p>
          </div>
        </div>
        <div className="vertical"></div>
      </div>
      <div className="info">
        <div className="data">
          <div className="icon">
            <FaUndoAlt size={30} color="#ecce11"/>
          </div>
          <div className="details">
            <Title level={4}>90 Days Return</Title>

            <p>If goods have problem</p>
          </div>
        </div>
        {fix?<></>:<div className="vertical1"></div>}
        
      </div>
      <div className="info">
        <div className="data">
          <div className="icon">
            <FaWallet size={30} color="#ecce11"/>
          </div>
          <div className="details">
            <Title level={4}>Secure Payment</Title>

            <p>100% secure payment</p>
          </div>
        </div>
        <div className="vertical"></div>
      </div>
      <div className="info">
        <div className="data">
          <div className="icon">
            <FaComments size={30} color="#ecce11"></FaComments>
          </div>
          <div className="details">
            <Title level={4}>24/7 Support</Title>

            <p>Dedicated support</p>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default Policy;
