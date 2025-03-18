import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";

const Home = () => {
  return (
    <main>
      <section className="container">
        <h1>Style It Up</h1>

        <Carousel id="carouselTop" />
        <Carousel id="carouselBottom" />
      </section>
      <Link className="page-nav" to="/add">
        <button className="btn-add">Add Items</button>
      </Link>
    </main>
  );
};

export default Home;
