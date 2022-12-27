import React ,{useEffect} from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Result } from 'antd';
import "./success.scss";

import { clearOrderError } from '../../slices/orderSlice';


function Success() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearOrderError())
    
    
  }, [])
  
  return (
    <div className='success'>
        <Result
    status="success"
    title="Successfully Orderd Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
        <Link to={"/"}>
      <Button type="primary" key="console">
        Back to Home 
      </Button></Link>,
      <Button key="buy">View Cart</Button>,
    ]}
  />
    </div>
  )
}

export default Success