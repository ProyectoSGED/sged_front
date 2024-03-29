import React from "react";

const CarouselItem = ({ isFirstElement, imageName }) => {
  return (
    <div className={isFirstElement ? "carousel-item active" : "carousel-item"}>
      <img
        alt="item"
        height="350"
        className="d-block w-100 carousel-image"
        src={`${process.env.PUBLIC_URL}/images/carousel/${imageName}`}
      />
    </div>
  );
};

export default CarouselItem;
