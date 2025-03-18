import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";

const Home = () => {
  return (
    <main className="text-center" style={{ marginTop: '80px' }}>
      <section className="container">
        <h1 className="text-primary" style={{ backgroundColor: '#7669EA', color: 'white', padding: '10px', borderRadius: '10px' }}>Style It Up</h1>

        <Carousel id="carouselTop" />
        <Carousel id="carouselBottom" />
      </section>
      <Link className="page-nav" to="/add">
        <button className="btn" style={{ backgroundColor: '#7669EA', color: 'white', marginTop: '20px', padding: '10px 20px', borderRadius: '10px', width: '150px' }}>Add Items</button>
      </Link>
    </main>
  );
};

export default Home;