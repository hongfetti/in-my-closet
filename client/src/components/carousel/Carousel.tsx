import test1 from "../../assets/test1.jpg";
import test2 from "../../assets/test2.jpg";
import test3 from "../../assets/test3.jpg";
import "./carousel.css";

const Carousel = () => {
  return (
    <section>
      <div id="carouselExample" className="carousel slide" data-bs-ride="false">
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

        {/* Previous and Next Buttons
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>*/}
      </div>

      {/* External Previous and Next Buttons (Optional) */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary me-2"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Carousel;
