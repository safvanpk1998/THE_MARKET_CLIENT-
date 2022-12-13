
import React from "react";
import { useNavigate } from "react-router-dom";


import {
    Tabs,
    Typography,
    Button
  
   
  } from "antd";
  import { ReloadOutlined} from "@ant-design/icons";

import Order from "../../../components/admin-components/Order";
import ProductDetails from "../../../components/admin-components/product";
import UserDetails from "../../../components/admin-components/user";
import "./view.scss";
const { Title } = Typography;

function View() {
  const refreshPage = () => {
    navigate(0);
  }
  const navigate = useNavigate();
  
  return (
    <div className="view-component">
      <div className="tab">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab={<Title level={5}>User Details</Title>} key="1">
            <UserDetails></UserDetails>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<Title level={5}>Product Details</Title>} key="2">
            <ProductDetails></ProductDetails>
          </Tabs.TabPane>

          <Tabs.TabPane tab={<Title level={5}>Order Details</Title>} key="3">
            <Order></Order>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className="refresh">
      <Button
          type="primary"
          icon={<ReloadOutlined />}
          // loading={loadings}
          onClick={ refreshPage}
        />

      </div>
     
    </div>
  );
}

export default View;