
/**
 * 
 * author: safvan
 * 
 */

import React, { useRef } from "react";
import "./banner.scss";
import { Carousel, Typography, Button } from "antd";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import speaker from "../../assets/images/speaker.png";
import kitchen from "../../assets/images/kitchen.png";
import jbl from "../../assets/images/jbl.png";
import toy from "../../assets/images/toy.png";
const { Title } = Typography;

function Banner() {
  const carousel = useRef();
  const handleNext = () => carousel.current.next();

  const handlePrev = () => carousel.current.prev();
  return (
    <div className="banner">
      <div className="arrow">
        <FaArrowCircleLeft
          onClick={handlePrev}
          size={25}
          color="rgb(0 0 0 / 65%)"
        />
      </div>
      <Carousel autoplay ref={carousel}>
        <div className="carousel">
          <div className="ad-text">
            <div className="offer">
              <p>Mega Sale nov 2022</p>
            </div>
            <Title level={2}>
              Double combo with <br></br> the music
            </Title>
            <div></div>
            <div>
              <div className="offer_per">
                <div className="sale">
                  <Title level={5}>sale up to </Title>
                </div>

                <div className="percentage">
                  <Title level={3}>72% off</Title>
                </div>
              </div>
              <Button type="primary"> Shop now</Button>
            </div>
          </div>

          <div>
            <img src={speaker} alt="" />
          </div>
        </div>
        <div className="carousel">
          <div className="ad-text">
            <div className="offer">
              <p>Mega Sale nov 2022</p>
            </div>
            <Title level={2}>
              Next-Gen Kitchen <br></br> Appliances
            </Title>
            <div></div>
            <div>
            <div className="offer_per">
              <div className="sale">
                <Title level={5}>sale up to </Title>
              </div>

              <div className="percentage">
                <Title level={3}>50% off</Title>
              </div></div>
              <Button type="primary"> Shop now</Button>
            </div>
          </div>

          <div>
            <img src={kitchen} alt="" />
          </div>
        </div>
        <div className="carousel">
          <div className="ad-text">
            <div className="offer">
              <p>Mega Sale nov 2022</p>
            </div>
            <Title level={2}>
              Put The World <br></br>On Mute
            </Title>
            <div></div>
            <div>
            <div className="offer_per">
              <div className="sale">
                <Title level={5}>sale up to </Title>
              </div>

              <div className="percentage">
                <Title level={3}>44% off</Title>
              </div></div>
              <Button type="primary"> Shop now</Button>
            </div>
          </div>

          <div>
            <img src={jbl} alt="" style={{ height: "310px" }} />
          </div>
        </div>
        <div className="carousel">
          <div className="ad-text">
            <div className="offer">
              <p>Mega Sale nov 2022</p>
            </div>
            <Title level={2}>
              Let's paly Anytime <br></br> Anywhere
            </Title>
            <div></div>
            <div>  <div className="offer_per">
              <div className="sale">
                <Title level={5}>sale up to </Title>
              </div>

              <div className="percentage">
                <Title level={3}>65% off</Title>
              </div></div>
              <Button type="primary"> Shop now</Button>
            </div>
          </div>

          <div>
            <img src={toy} alt="" style={{ height: "320px" }} />
          </div>
        </div>
      </Carousel>
      <div className="arrow">
        <FaArrowCircleRight
          onClick={handleNext}
          size={25}
          color="rgb(0 0 0 / 65%)"
        />
      </div>
    </div>
  );
}

export default Banner;
