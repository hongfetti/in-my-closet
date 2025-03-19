import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries";

const Home = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  console.log("User:", GET_CURRENT_USER);
  console.log("Fetched Data:", data);
  // console.log("Loading:", loading);
  // console.log("Error:", error);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data.</p>;

  const userTopImageURLS =
    data?.currentUser.clothingItems.filter(
      (clothingItem: any) => clothingItem.articleType === "TOP"
    ) ?? [];
  const userBottomImageURLS =
    data?.currentUser.clothingItems.filter(
      (clothingItem: any) => clothingItem.articleType === "BOTTOM"
    ) ?? [];

  return (
    <main className="text-center" style={{ marginTop: '80px' }}>
      <section className="container">
        <h1 className="text-primary" style={{ backgroundColor: '#7669EA', color: 'white', padding: '10px', borderRadius: '10px' }}>Style It Up</h1>

        <Carousel id="carouselTop" images={userTopImageURLS} />
        <Carousel id="carouselBottom" images={userBottomImageURLS} />
      </section>
      <Link className="page-nav" to="/add">
        <button className="btn" style={{ backgroundColor: '#7669EA', color: 'white', marginTop: '20px', padding: '10px 20px', borderRadius: '10px', width: '150px' }}>Add Items</button>
      </Link>
    </main>
  );
};

export default Home;