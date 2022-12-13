import React from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Card, Col, Row, Rate, Input, Button,BackTop } from "antd";
import { FaFacebookF,FaInstagramSquare,FaTwitter,FaLinkedin,FaGooglePlusSquare } from "react-icons/fa";
import "./footer.scss";
const { Title } = Typography;
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
function Footer() {
  return (
    <footer className="footer">
      <div className="news">
        <div className="info">
          <Title level={3}>News Letter</Title>
          <p>Subcribe to get information about products and coupons</p>
        </div>

        <Input.Group compact>
          <Input />
          <Button type="primary">Subscribe</Button>
        </Input.Group>
      </div>
      <hr></hr>
      <div className="communication">
        <div>
          <Title level={4}> Conatct Us</Title>
          <p>Omassery, Kozhikode, Kerala, India</p>
          <p>safvanpk414@gmail.com</p>
          <div className="contact">
          <Title level={3}> +91 7306 77 65 22</Title>
          </div>
         
        </div>
      

      <div>
        <Title level={4}> Quick Links</Title>
        <Link to="/">Home</Link>
        <p>My Profile</p>
        <p>Orders</p>
        <p>Deal Of The Day</p>
      </div>

      <div>
        <Title level={4}>About</Title>
        <p class="hover-underline-animation">Company</p>
        <p>Contact Us</p>
        <p>Careers</p>
        <p>Corporate Informations</p>
      </div>
      <div>
        <Title level={4}>Policy</Title>
        <p>Return Policy</p>
        <p>Terms & Conditions</p>
        <p>Privacy</p>
        <p>Trademarks</p>
      </div>
      </div>
      <hr></hr>
      <div className="socialmedia">
        <p> All Right Reserved </p>
      <div className="icon" >
        <FaFacebookF></FaFacebookF>
        <FaInstagramSquare></FaInstagramSquare>
        <FaTwitter></FaTwitter>
        <FaLinkedin></FaLinkedin>
        <FaGooglePlusSquare></FaGooglePlusSquare>
        
      </div>
      <BackTop>
      <div className="top">UP</div>
    </BackTop>
      </div>
    
    </footer>
  );
}

export default Footer;
