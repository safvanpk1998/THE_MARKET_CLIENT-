import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { loadUser, logoutUser, clearAuthError } from "../../slices/authSlice";
import "@fontsource/signika";
import "./header.scss";
import {
  Menu,
  Input,
  Space,
  Typography,
  Button,
  Drawer,
  Select,
  Layout,
  Badge,
  message,
  Dropdown,
  Divider,
  Tag,
  Popover,
  Avatar,
  Collapse,
} from "antd";
import {
  UserOutlined,
  SmileOutlined,
  DownOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import {
  FaShoppingCart,
  FaShoppingBag,
  FaUserCircle,
  FaPhoneAlt,
  FaHome,
  FaAddressCard,
  FaArchway,
  FaFolder,
  FaBuromobelexperte,
  FaBlenderPhone,
  FaUserShield,
  FaBox,
  FaCogs,
  FaCookie,
} from "react-icons/fa";
import phone from "../../assets/others/images.jpg";
import electronics from "../../assets/others/laptop.jpg";
import books from "../../assets/others/books.png";
import appliences from "../../assets/others/applinces.png";
import seller from "../../assets/others/seller.png";
import best from "../../assets/others/best.png";

import "antd/dist/antd.min.css";
import { getProduct } from "../../slices/productSlice";
import { getStockers } from "../../utils/adminApi";
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { Footer } = Layout;

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, isAuthenticated, Wishlistcount, ordercount } =
    useSelector((state) => state.user);

  const [Language, Setlanguage] = useState(0);
  const [currency, SetCurrency] = useState(0);
  const [fix, SetFix] = useState();
  const [traders, setTraders] = useState([]);
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const handleLanguage = (value) => {
    Setlanguage(value);
  };

  const setFixed = () => {
    if (window.scrollY >= 60) {
      SetFix(true);
    } else {
      SetFix(false);
    }
  };
  window.addEventListener("scroll", setFixed);
  const selectStocker = (value) => {
    console.log(value.key, "stoker");
    navigate(`/product/${value.key}`);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const onChange = (value) => {
    navigate(`/product/${value}`);
    console.log(`selected ${value}`);
  };
  const searchStocker = (value) => {
    console.log("search:", value);
  };

  const handleCurrency = (value) => {
    SetCurrency(value);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
   document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    message.success("Successfully logged out");
    
    
    navigate("/");
  };
  let id = "";
  const onSearch = (value) => {
    id = value;

    navigate(`/${id}`);
  };
  const menubar = {
    padding: "0px 140px 0px 140px",
  };
  const getTraders = async () => {
    let response = await getStockers();
    if (response.error) {
      message.error("Something went wrong");
    } else {
      setTraders(response.stockers);
    }
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="/cart"> Cart</Link>,
        },
        {
          key: "2",
          label: <Link to="/orders"> Orders</Link>,
        },
        {
          key: "3",
          danger: true,
          label: <p onClick={handleLogout}> LogOut</p>,
        },
      ]}
    />
  );

  useEffect(() => {
    dispatch(clearAuthError());
    getTraders();

    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      <div className="headerComponent">
        {user && user.role === "admin" ? (
          <div></div>
        ) : (
          <div className="base-raw">
            <div className="title-comment">
              <p level={5}>Welcome to The Market Online Shopping Store!</p>
            </div>
            <div className="settings">
              <div>
                <Select
                  defaultValue="English"
                  style={{
                    width: 150,
                  }}
                  onChange={handleLanguage}
                >
                  <Option value="english">English</Option>
                  <Option value="hindi">Hindi</Option>
                  <Option value="malayalam">Malayalam</Option>
                </Select>
              </div>
              <div>
                <Select
                  defaultValue="Indian Rupee"
                  style={{
                    width: 150,
                  }}
                  onChange={handleCurrency}
                >
                  <Option value="english">Indian Rupee</Option>
                  <Option value="hindi">Us Doller</Option>
                  <Option value="malayalam">Euro</Option>
                </Select>
              </div>
              <div>
                <p level={5}>Track Your Order</p>
              </div>
              <div>
                <p level={5}>Store Location</p>
              </div>
            </div>
          </div>
        )}

        <div className="mid-row">
          <div className="heading">
            <Link to="/">
              <h1>
                THE <span className="logo">MARKET</span>
              </h1>
            </Link>
          </div>
          <div className="moto">
            <p level={5}>Welcome to The Market Online Shopping Store!</p>
          </div>

          <div className={fix ? "stickySearch" : "search"}>
            <Search
              placeholder="type your needs here"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>
          <div className={user ? "userIcon" : "icons"}>
            <div className="cart-icon">
              <Link to="/cart">
                <Badge count={ordercount} size="small">
                  <FaShoppingCart size={25} />
                </Badge>
              </Link>
              <Link to="/wishList">
                {" "}
                <Badge count={Wishlistcount} size="small">
                  <FaShoppingBag size={25}></FaShoppingBag>
                </Badge>
              </Link>

              <FaShoppingCart size={25} />
            </div>
            <div className="dropdown">
              <div className="user">
                {isAuthenticated == true ? (
                  <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <div className="userName">
                          <div>
                            <h3>{user.name}</h3>
                          </div>
                        </div>{" "}
                      </Space>
                    </a>
                  </Dropdown>
                ) : (
                  <div>
                    <Link to="/login">
                      <h3>login/</h3>
                    </Link>
                    <h3>Register</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="menubar">
            <MenuOutlined onClick={showDrawer} />
          </div>
        </div>
      </div>
      <div className="bottom-row">
        <Menu mode="horizontal"></Menu>
        <div className="menu-bar">
          <div className="menu">
            <div className="select">
              {/* <Dropdown overlay={vendor}>
              
                  <Link >
                  <Space>
                    <h3>Shop By Stockist</h3>
                    <DownOutlined />
                  </Space>
                  </Link>
           
              </Dropdown> */}

              <Select
                showSearch
                placeholder="Search By Seller"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={searchStocker}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={traders.map((data) => ({
                  label: data.name,
                  value: data._id,
                }))}
              />
            </div>
            <div className="navbar">
              <div className="menu-item">
                <Link to="/mobiles">
                  <h3>Mobiles</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/electronics">
                  <h3>Electronics</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/books">
                  <h3>Books</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/homeAppliances">
                  <h3>Home Appliances</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/bestSellers">
                  <h3>Best Sellers</h3>
                </Link>
              </div>
              {user && user.role === "admin" ? (
                <>
                  <div className="menu-item">
                    <Link to="/admin">
                      {" "}
                      <h3>Admin</h3>
                    </Link>
                  </div>
                  <div className="menu-item">
                    <Link to="/statics">
                      {" "}
                      <h3>Statics</h3>
                    </Link>
                  </div>
                  <div className="menu-item">
                    <Link to="/admin/actions">
                      {" "}
                      <h3>Actions</h3>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="menu-item">
                  <h3>Customer Service</h3>
                </div>
              )}
            </div>
            <div className="menu_image">
              <div className="menu-item">
                <Link to="/mobiles">
                  <img src={phone} alt="" />
                  <h3>Mobiles</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/electronics">
                  <img src={electronics} alt="" />
                  <h3>Electronics</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/books">
                  <img src={books} alt="" />
                  <h3>Books</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/homeAppliances">
                  <img src={appliences} alt="" />
                  <h3>Appliances</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/bestSellers">
                  <img src={best} alt="" />
                  <h3>Best Sellers</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/electronics">
                  <img src={electronics} alt="" />
                  <h3>Electronics</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/books">
                  <img src={books} alt="" />
                  <h3>Books</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/homeAppliances">
                  <img src={appliences} alt="" />
                  <h3>Appliances</h3>
                </Link>
              </div>
              <div className="menu-item">
                <Link to="/bestSellers">
                  <img src={best} alt="" />
                  <h3>Best Sellers</h3>
                </Link>
              </div>
            </div>
          </div>

          <div className="hotline">
            <h3>
              <span className="phone-icon">
                <FaPhoneAlt></FaPhoneAlt>
              </span>
              Hotline 0-0011-1883
            </h3>
          </div>
        </div>

        <Menu mode="horizontal"></Menu>
      </div>
      <Drawer
        width={240}
        onClose={onClose}
        closable={false}
        open={open}
        placement="right"
      >
        <div className="content">
          <div className="heading">
            <h2>
              THE <span className="logo">MARKET</span>
            </h2>
            <div className="home">
              <Link to="/">
                <FaHome size={25} color={"#437814"}></FaHome>{" "}
              </Link>
            </div>
          </div>
          <Divider></Divider>
          <div className="menuItems">
            <div className="icon">
              <FaBuromobelexperte></FaBuromobelexperte>
            </div>
            <div className="name">All categories</div>
          </div>
          <Link to="/cart">
            <div className="menuItems">
              <div className="icon">
                <FaBox></FaBox>
              </div>
              <div className="name"> My Orders</div>
            </div>
          </Link>
          <Link to="/">
            <div className="menuItems">
              <div className="icon">
                <FaArchway></FaArchway>
              </div>
              <div className="name"> Store Location</div>
            </div>
          </Link>
          <Link to="/wishList">
            <div className="menuItems">
              <div className="icon">
                <FaFolder> </FaFolder>
              </div>
              <div className="name"> My WishList</div>
            </div>
          </Link>
          <Link to="/">
            <div className="menuItems">
              <div className="icon">
                <FaBlenderPhone></FaBlenderPhone>
              </div>
              <div className="name"> Contact Us</div>
            </div>
          </Link>
          <Divider></Divider>
          {isAuthenticated == true ? (
            <div className="userAccounts">
              <div>
                <div className="menuItems">
                  <div className="icon">
                    <FaUserShield></FaUserShield>
                  </div>
                  <div className="name"> {user.name}</div>
                </div>
              </div>
              <div className="menuItems">
                <div className="icon">
                  <FaAddressCard></FaAddressCard>
                </div>
                <div className="name"> My Account</div>
              </div>

              <div className="menuItems">
                <div className="icon">
                  <FaCogs></FaCogs>
                </div>
                <div className="name"> Settings</div>
              </div>
              <Link to="/">
                <div className="menuItems" onClick={handleLogout}>
                  <div className="icon">
                    <LogoutOutlined />
                  </div>
                  <div className="name">Logout</div>
                </div>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <div className="login">
                <Button>Login/Register</Button>
              </div>
            </Link>
          )}
        </div>
        <div className="userdata">
          {/* <Divider></Divider> */}

          <Footer style={{ textAlign: "center" }}>
            The market ©2022 Created by SPK Pvt Ltd
          </Footer>
        </div>

        {/* <Button type="primary" onClick={showChildrenDrawer}>
          Two-level drawer
        </Button>
        <Drawer
          size={250}
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          This is two-level drawer
        </Drawer> */}
      </Drawer>
    </div>
  );
}

export default Header;
