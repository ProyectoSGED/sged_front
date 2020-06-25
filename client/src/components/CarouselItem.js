import React from "react";

const CarouselItem = ({ isFirstElement, imageName }) => {
  return (
    <div className={isFirstElement ? "carousel-item active" : "carousel-item"}>
      <img
        alt="item"
        height="400"
        className="d-block w-100"
        src={`${process.env.PUBLIC_URL}/images/carousel/${imageName}`}
      />
    </div>
  );
};

export default CarouselItem;
