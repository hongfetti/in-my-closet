import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";

const Home = () => {
  return (
    <main>
      <section className="container">
        <h1 className="style-it-up">Style It Up</h1>

        <Carousel id="carouselTop" />
        <Carousel id="carouselBottom" />
      </section>

      {/* Updated Bootstrap Button */}
      <div className="d-flex justify-content-center mt-4">
        <Link to="/add">
          <button className="btn btn-primary custom-btn">Add Items</button>
        </Link>
      </div>
    </main>
  );
};

export default Home;