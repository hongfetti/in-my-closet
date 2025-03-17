import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";

const Home = () => {
  return (
    <main>
      <h1>Home</h1>
      <Carousel />
      <Carousel />
      {/* add two carousel components for tops and bottoms */}

      <Link className="page-nav" to="/add">
        <button className="btn-add">Add Items</button>
      </Link>
    </main>
  );
};

export default Home;
