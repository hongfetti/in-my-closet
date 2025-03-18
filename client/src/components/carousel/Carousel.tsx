import React from "react";
import test1 from "../../assets/test1.jpg";
import test2 from "../../assets/test2.jpg";
import test3 from "../../assets/test3.jpg";
import "./carousel.css";

interface CarouselProps {
  id: string;
}

const Carousel: React.FC<CarouselProps> = ({ id }) => {
  return (
    <section className="carouselContainer">
      <div id={id} className="carousel slide" data-bs-ride="false">
        {/* Previous Button */}
        <button
          className="btn custom-carousel-btn control-prev"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="prev"
        >
          ←
        </button>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={test1}
              className="closet-item d-block w-100"
              alt="rainbow beach"
            />
          </div>
          <div className="carousel-item">
            <img
              src={test2}
              className="closet-item d-block w-100"
              alt="mountain water"
            />
          </div>
          <div className="carousel-item">
            <img
              src={test3}
              className="closet-item d-block w-100"
              alt="colorful bird"
            />
          </div>
        </div>

        <button
          className="btn custom-carousel-btn control-next"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="next"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default Carousel;
