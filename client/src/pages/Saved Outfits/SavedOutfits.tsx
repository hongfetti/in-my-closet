import { useQuery } from "@apollo/client";
import { GET_ALL_MY_OUTFITS } from "../../utils/queries";

const SavedOutfits = () => {
  const { loading, error, data } = useQuery(GET_ALL_MY_OUTFITS);

  if (loading) return <p>Loading Saved Outfits...</p>;
  if (error) return <p>Error: {error.message}</p>


  return (
    <div className="saved-outfits">
      <h1>Your Saved Outfits</h1>
      {data.myOutfits.length === 0 ? (
        <p>You don't have any saved outfits yet.</p>
      ) : (
        <div className="outfits-list">
          {data.myOutfits.map((outfit: any) => ( /*get type from ryan tomorrow */
            <div key={outfit._id} className="outfit-card">
              <h3>Outfit ID: {outfit._id}</h3>
              <div className="outfit-image">
                <div className="top">
                  <img src={outfit.top.image_url} alt="Top" />
                </div>
                <div className="bottom">
                  <img src={outfit.bottom.image_url} alt="Bottom" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedOutfits;

