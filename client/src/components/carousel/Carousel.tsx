import React from "react";
import "./carousel.css";
import { ClothingItems } from "../../interfaces/ClothingItems";

interface CarouselProps {
  id: string;
  images: ClothingItems[];
}

const Carousel: React.FC<CarouselProps> = ({ id, images }) => {
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
          {images.map((image) => (
            <div key={image.image_url} className="carousel-item active">
              <img
                src={image.image_url}
                className="closet-item d-block w-100"
                alt={image.articleType}
              />
            </div>
          ))}
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
