import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Space,
  Typography,
  Tooltip,
  Table,
} from "antd";
import { Link } from "react-router-dom";
import "./cart.scss";
import Header from "../../components/layout-component/header";

import Footer from "../../components/layout-component/footer";
import { getMyOders } from "../../slices/orderSlice";
const { Title } = Typography;

function Cart() {
  const [data, setdata] = useState([{
      
    name: "",
    image:"image",
    prize:"Prize",
    date:"date",
    Value: 2022.5,
    id:"id",
    status:"orderStatus"
    }]);

  const dispatch = useDispatch();

  const {myOrder,mylist} = useSelector((state) => state.order);
  if (myOrder) {
 
    // window.location.reload();
  }
  
  


  const [tableParams, setTableParams] = useState({
    pagination: {
      // current: 1,
      pageSize: 5,
      
    },
  });
  
 
  

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "name",
      width: "13%",
          maxWidth: 50,
      render: image => <div className="image"><img alt={"product Image"} src={image} /></div> 
      // render:  () => <img src={"image"} alt="product Image"  />

      
    },
    {
      title: "Prize",
      dataIndex: "prize",
      key: "name",
      width: "13%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "name",
      width: "14%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "name",
      width: "20%",
    },
    {
      title: "Actions",
      fixed: "right",
      dataIndex: "id",
      key: "id",
       width: "10%",
      render: id => (
        <Space size="middle">
          <Tooltip title="View">
            <Link to={`/cart/${id}`}>
              View
            </Link>
          </Tooltip>
        
        
        </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getMyOders())  
    let order=myOrder.myorder
    if(order){
      setdata(
  
        order.map(data => ({
      
        name: data.orderItems.name,
        image:data.orderItems.image,
        prize:data.amountPayable,
        date:data.createdAt,
        Value: 2022.5,
        id:data._id,
        status:data.orderStatus
        })))
      
    }
  
   
    
  }, [dispatch,mylist])
  
  return (
    <div className="cart-component">
      <Header></Header>
      <div className="body">
        <div className="title">
          <Title level={1}> Shopping Cart </Title>
        </div>
        <div>

          {data?  <Table
            dataSource={data}
            scroll={{ x: 600 }}
            columns={columns}
            pagination={tableParams.pagination}
          /> :<div>no data found</div>}
         
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Cart;
