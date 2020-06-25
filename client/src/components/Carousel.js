import React from "react";
import CarouselItem from "./CarouselItem";
import { ListCarouselImages } from "../helpers/ListCarouselImages";

const Carousel = () => {
  return (
    <div className="container-fluid carousel-container">
      <div id="carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {ListCarouselImages.map((image, index) => (
            <CarouselItem
              key={image.name}
              imageName={image.name}
              isFirstElement={index === 0 ? true : false}
            />
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carousel"
          data-slide="prev"
          role="button"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carousel"
          data-slide="next"
          role="button"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Carousel;
