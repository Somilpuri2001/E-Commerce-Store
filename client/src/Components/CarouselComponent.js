import React from "react";
import { Carousel } from "antd";
import "../styles/Homepage.css"

const CarouselComponent = (props) => {

  return (
    <Carousel arrows infinite={true} autoplay={true} autoplaySpeed={3000}>
      <div>
        <img src={props.img1} alt={props.alt1} className="banner-image" />
      </div>
      <div>
      <img src={props.img2} alt={props.alt2} className="banner-image"/>
      </div>
      <div>
      <img src={props.img3} alt={props.alt3} className="banner-image"/>
      </div>
      <div>
      <img src={props.img4} alt={props.alt4} className="banner-image"/>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
