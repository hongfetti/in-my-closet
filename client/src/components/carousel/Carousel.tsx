import React, { useState, useEffect } from "react";
import "./carousel.css";
import { ClothingItems } from "../../interfaces/ClothingItems";

// Define the type for the component's props
interface CarouselProps {
  id: string;
  images: ClothingItems[];
  onUpdateVisibleItem: (id: string) => void; // Pass visible item to parent
}

const Carousel: React.FC<CarouselProps> = ({
  id,
  images,
  onUpdateVisibleItem,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      onUpdateVisibleItem(images[currentIndex]._id); //?????????????
    }
  }, [currentIndex, images, onUpdateVisibleItem]);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <section className="carouselContainer">
      <div id={id} className="carousel slide" data-bs-ride="false">
        <button
          className="btn btn-primary me-2 control-prev"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="prev"
          onClick={prevItem}
        >
          ←
        </button>

        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={image._id || index}
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <img
                src={image.image_url}
                className="closet-item d-block w-100"
                alt={image.articleType}
              />
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary control-next"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="next"
          onClick={nextItem}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default Carousel;
