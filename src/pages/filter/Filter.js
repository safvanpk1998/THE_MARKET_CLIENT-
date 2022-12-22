import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import qs from "qs";
import "./filter.scss";
import {
  Typography,
  Card,
  Col,
  Row,
  Rate,
  Cascader,
  Select,
  Tag,
  Slider,
} from "antd";
import Header from "../../components/layout-component/header";
import { getfilterdProduct } from "../../slices/productSlice";
const { Title } = Typography;



const category = [
  {
    label: "Speaker",
    value: "Speaker",
  },
  {
    value: "Speaker",
  },
  {
    value: "KeypadPhone",
  },
  {
    value: "HeadPhone",
  },
  {
    label: "Beard",
    value: "beard",
  },
  {
    label: "Teddy",
    value: "teddy",
  },
];
const Brand = [
  {
    value: "Apple",
  },
  {
    value: "Samsung",
  },
  {
    value: "Xiomi",
  },
  {
    value: "Oppo",
  },
  {
    value: "Nothing",
  },
  {
    value: "Huawei",
  },
];
const Offer = [
  {
    label: "10%  off or more",
    value: 10,
  },
  {
    label: "20%  off or more",
    value: 20,
  },
  {
    label: "30%  off or more",
    value: 30,
  },
  {
    label: "40%  off or more",
    value: 40,
  },
  {
    label: "50%  off or more",
    value: 50,
  },
  {
    label: "60%  off or more",
    value: 60,
  },
  {
    label: "70%  off or more",
    value: 70,
  },
];

function Filter() {
  
  let { keyword,soldBy} = useParams()
  console.log(soldBy,"keee")
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  let type=window.location.pathname.substr(1,)
  const [rating, setRating] = useState(0);


  const params = new URLSearchParams(location.search);

  const [subCategory, setSubCategory] = useState(" ");
  const [offer, setOffer] = useState(0);
  const [price, setPrice] = useState();

  const [brand, setBrand] = useState(" ");
  const [amountPayable, setAmountPayable] = useState([0, 25000]);
  const priceHandler = (value) => {};

  const SelctCategory = (value, param) => {
    if (param == "category") {
      const str = qs.stringify({ subCategory: [value] }, { indices: false });

      navigate(`${pathname}?${str}`);
      setSubCategory(str);
    }
    if (param == "brand") {
      const str = qs.stringify({ brand: [value] }, { indices: false });

      navigate(`${pathname}?${str}`);
      setBrand(str);
    }
  };
  const handleoffer = (value) => {
    setOffer(value);
  };
  const onAfterChange = (value) => {
    setPrice(value);
  };
 
  if (keyword) {
    keyword =keyword;
    type=""
  
  } else {
    keyword = "";
  }
  if (soldBy) {
    soldBy =soldBy;
    type=""
  
  } else {
    soldBy = "";
  }
 
  if (type) {
    type =type;
  
  } else {
    type = "";;
  }
  
  

  const onChange = (value) => {
    console.log("onChange: ", value);
  };

  useEffect(() => {

  

    let data = {
      keyword: keyword,
      soldBy:soldBy,
      type: type,
      soldBy: soldBy,
      subCategory: subCategory,
      brand: brand,
      offer: offer,
      amountPayable: price,
      ratings:rating
    };
    console.log(typeof section, "euiwu");
    console.log(data, "cbewugfy");
    dispatch(getfilterdProduct(data));
  }, [subCategory, brand, pathname, offer, price, category,rating]);

  return (
    <>
      <div className="filter">
        <div className="header">
          <Title level={4}>
            Computors & <br />
            Technologies
          </Title>

          <Title level={5}> Filters</Title>
          <div>
            <Title level={5}> Categories</Title>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              id="category"
              placeholder="Select Category"
              onChange={(value) => SelctCategory(value, "category")}
              options={category}
            ></Select>
            <Title level={5}> Brands</Title>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Select Brand"
              onChange={(value) => SelctCategory(value, "brand")}
              options={Brand}
            ></Select>
            <div className="distype">
              <Title level={5}> Discount</Title>
              <Select
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select Dicount range"
                onChange={handleoffer}
                options={Offer}
              ></Select>
            </div>
            <Title level={5}> Price</Title>
            <Slider
              range
              min={1}
              max={100000}
              step={10}
              defaultValue={[0, 5000]}
              onChange={priceHandler}
              onAfterChange={onAfterChange}
            />

            <div className="rating">
              <Title level={5}> Customer Rating</Title>
              <Rate defaultValue={0} onChange={setRating} value={rating} />

            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </>
  );
}

export default Filter;
