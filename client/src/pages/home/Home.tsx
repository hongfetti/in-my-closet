import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries";

const Home = () => {
  const {
    data,
    // loading, error
  } = useQuery(GET_CURRENT_USER);
  console.log(data);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data.</p>;

  const userTopImageURLS =
    data?.currentUser.clothingItems.filter(
      (clothingItem: any) => clothingItem.articleType === "Top"
    ) ?? [];
  const userBottomImageURLS =
    data?.currentUser.clothingItems.filter(
      (clothingItem: any) => clothingItem.articleType === "Bottom"
    ) ?? [];

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
