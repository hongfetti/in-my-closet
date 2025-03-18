import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries";

const Home = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  console.log(data);

  const userTopImageURLS = data.me.clothingItems.filter(
    (clothingItem: any) => clothingItem === "Top"
  );
  const userBottomImageURLS = data.me.clothingItems.filter(
    (clothingItem: any) => clothingItem === "Bottom"
  );

  return (
    <main>
      <section className="container">
        <h1>Home</h1>

        <Carousel id="carouselTop" images={userTopImageURLS} />
        <Carousel id="carouselBottom" images={userBottomImageURLS} />
      </section>
      <Link className="page-nav" to="/add">
        <button className="btn-add">Add Items</button>
      </Link>
    </main>
  );
};

export default Home;
