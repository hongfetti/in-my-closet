import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_MY_OUTFITS } from "../../utils/queries";
import { DELETE_OUTFIT } from "../../utils/mutations";

const Saved = () => {
  const { loading, error, data } = useQuery(GET_ALL_MY_OUTFITS);
  const [deleteOutfit] = useMutation(DELETE_OUTFIT, {
    refetchQueries: [{ query: GET_ALL_MY_OUTFITS }],
  });

  if (loading) return <p>Loading Saved Outfits...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("im right Here", data);

  return (
    <main className="container mt-5">
      <h1
        className="text-center"
        style={{
          backgroundColor: "#7669EA",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        Your Saved Outfits
      </h1>
      {data.myOutfits.length === 0 ? (
        <p className="text-center">You don't have any saved outfits yet.</p>
      ) : (
        <div className="row mt-4">
          {data.myOutfits.map((outfit: any) => (
            <div key={outfit._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#FFBE98" }}
                >
                  <div className="outfit-image d-flex justify-content-around">
                    <div className="top">
                      <img
                        src={outfit.topId?.image_url || ""}
                        alt="Top"
                        className="img-fluid"
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="bottom">
                      <img
                        src={outfit.bottomId?.image_url || ""}
                        alt="Bottom"
                        className="img-fluid"
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <button
                    className="btn uniform-button w-100 mt-3"
                    style={{ backgroundColor: "#7669EA", color: "white" }}
                    onClick={() => {
                      console.log("Deleting outfit with ID:", outfit._id);
                      deleteOutfit({
                        variables: { input: { id: outfit._id } },
                      });
                    }}
                  >
                    Delete Outfit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Saved;
