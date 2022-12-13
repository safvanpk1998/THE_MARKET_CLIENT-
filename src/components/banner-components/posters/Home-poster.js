import React, { useState, useEffect } from "react";
import "./homePoster.scss";
import { Typography, Carousel } from "antd";

import iphone from "../../../assets/images/iphone.png";
import pan from "../../../assets/images/pan.png";
import shave from "../../../assets/images/shave.png";
const { Title } = Typography;

function Homeposter() {
  const [screen, setScreen] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth > 380) {
      setScreen(true);
    } else {
      setScreen(false);
    }
  };
  window.addEventListener("resize", handleResize);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <div className="Home-poster">
      <div className="posters">
        <div className="poster">
          <div className="comment">
            <Title level={4}>
              {" "}
              iphone 13 pro <br />
              256 Gb
            </Title>
            <p>
              Experince with <br /> best smartPhone <br /> on the world
            </p>
          </div>
          <div className="img">
            <img src={iphone} alt="" />
          </div>
        </div>
        <div className="poster1">
          <div className="comment">
            <Title level={4}>
              {" "}
              TeFal
              <br />
              Frying Pan
            </Title>
            <p>
              Discover <br /> the taste of <br /> life
            </p>
          </div>
          <div className="img">
            <img src={pan} alt="" />
          </div>
        </div>
        <div className="poster2">
          <div className="comment">
            <Title level={4}> Gillette Shaving set</Title>
            <p>
              We make it easy <br /> to look, feel & <br /> smell your best
            </p>
          </div>
          <div className="img">
            <img src={shave} alt="" />
          </div>
        </div>
      </div>
      <div className="carousel">
        <Carousel
          autoplay
          Carousel
          slidesToShow={1}
          centerMode={screen}
          // asNavFor={this.state.media}
          // draggable={true}

          // swipeToSlide={true}
          // touchThreshold={50}
          focusOnSelect={true}
        >
          <div className="poster">
            <div className="comment">
              <Title level={4}>
                {" "}
                iphone 13 pro <br />
                256 Gb
              </Title>
              <p>
                Experince with <br /> best smartPhone <br /> on the world
              </p>
            </div>
            <div className="img">
              <img src={iphone} alt="" />
            </div>
          </div>
          <div className="poster1">
            <div className="comment">
              <Title level={4}> Gillette Shaving set</Title>
              <p>
                We make it easy <br /> to look, feel & <br /> smell your best
              </p>
            </div>
            <div className="img">
              <img src={shave} alt="" />
            </div>
          </div>

          <div className="poster2">
            <div className="comment">
              <Title level={4}>
                {" "}
                TeFal
                <br />
                Frying Pan
              </Title>
              <p>
                Discover <br /> the taste of <br /> life
              </p>
            </div>
            <div className="img">
              <img src={pan} alt="" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Homeposter;
