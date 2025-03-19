import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../utils/queries";
import { useState } from "react";
import SaveOutfitButton from "../../components/SaveOutfitBtn";

const Home = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  console.log("User:", GET_CURRENT_USER);
  console.log("Fetched Data:", data);
  // console.log("Loading:", loading);
  // console.log("Error:", error);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data.</p>;

  const userTopImageURLS =
    data?.currentUser.clothingItems
      .filter((clothingItem: any) => clothingItem.articleType === "TOP")
      .map((item: any) => ({
        _id: item._id, // Ensure `_id` is included
        image_url: item.image_url,
        articleType: item.articleType,
      })) ?? [];

  const userBottomImageURLS =
    data?.currentUser.clothingItems
      .filter((clothingItem: any) => clothingItem.articleType === "BOTTOM")
      .map((item: any) => ({
        _id: item._id, // Ensure `_id` is included
        image_url: item.image_url,
        articleType: item.articleType,
      })) ?? [];

  const [selectedTop, setSelectedTop] = useState<string | null>(
    userTopImageURLS[0]?._id ?? null
  );
  const [selectedBottom, setSelectedBottom] = useState<string | null>(
    userBottomImageURLS[0]?._id ?? null
  );

  const handleUpdateTopItem = (id: string) => {
    setSelectedTop(id); // Update top item state
  };

  const handleUpdateBottomItem = (id: string) => {
    setSelectedBottom(id); // Update bottom item state
  };

  return (
    <main>
      <section className="container">
        <h1>Home</h1>

        <Carousel
          id="carouselTop"
          images={userTopImageURLS}
          onUpdateVisibleItem={handleUpdateTopItem}
        />
        <Carousel
          id="carouselBottom"
          images={userBottomImageURLS}
          onUpdateVisibleItem={handleUpdateBottomItem}
        />
      </section>
      <section className="btn-section">
        <Link className="page-nav" to="/add">
          <button className="btn-add">Add Items</button>
        </Link>
        <SaveOutfitButton topId={selectedTop} bottomId={selectedBottom} />
      </section>
    </main>
  );
};

export default Home;
