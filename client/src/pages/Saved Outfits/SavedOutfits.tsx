// import { useQuery } from "@apollo/client";
// import { GET_ALL_MY_OUTFITS } from "../../utils/queries";
// //import  { Outfit }   from "../../../../server/src/schemas/typeDefs.js"
// const Saved = () => {
//   const { loading, error, data } = useQuery(GET_ALL_MY_OUTFITS);

//   if (loading) return <p>Loading Saved Outfits...</p>;
//   if (error) return <p>Error: {error.message}</p>

// console.log("im right Here" , data)
//   return (
//     <div className="saved-outfits">
//       <h1>Your Saved Outfits</h1>
//       {data.myOutfits.length === 0 ? (
//         <p>You don't have any saved outfits yet.</p>
//       ) : (
//         <div className="outfits-list">
//           {data.myOutfits.map((outfit: any) => ( /*get type from ryan tomorrow */
//             <div key={outfit._id} className="outfit-card">
//               <h3>Outfit ID: {outfit._id}</h3>
//               <div className="outfit-image">
//                 <div className="top">
//                   <img src={outfit.topId?.image_url || ''} alt="Top" />
//                 </div>
//                 <div className="bottom">
//                   <img src={outfit.bottomId?.image_url || ''} alt="Bottom" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Saved;

// import { useQuery } from "@apollo/client";
// import { useMutation } from "@apollo/client";
// import { GET_ALL_MY_OUTFITS } from "../../utils/queries";
// import { DELETE_OUTFIT } from "../../utils/mutations";
// //import  { Outfit }   from "../../../../server/src/schemas/typeDefs.js"
// const Saved = () => {
//   const { loading, error, data } = useQuery(GET_ALL_MY_OUTFITS);
//   const [deleteOutfit] = useMutation(DELETE_OUTFIT, {
//     refetchQueries: [{ query: GET_ALL_MY_OUTFITS }],
//   });
//   if (loading) return <p>Loading Saved Outfits...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   const handleSubmit = async (id: string) => {
//     try {
//       const { data } = await deleteOutfit({
//         variables: {
//           input: { id },
//         },
//       });
//     } catch (error) {
//       console.error(error);
//     }

//     console.log("im right Here", data);
//     return (
//       <div className="saved-outfits">
//         <h1>Your Saved Outfits</h1>
//         {data.myOutfits.length === 0 ? (
//           <p>You don't have any saved outfits yet.</p>
//         ) : (
//           <div className="outfits-list">
//             {data.myOutfits.map(
//               (outfit: any /*get type from ryan tomorrow */) => (
//                 <div key={outfit._id} className="outfit-card">
//                   <h3>Outfit ID: {outfit._id}</h3>
//                   <div className="outfit-image">
//                     <div className="top">
//                       <img src={outfit.topId?.image_url || ""} alt="Top" />
//                     </div>
//                     <div className="bottom">
//                       <img
//                         src={outfit.bottomId?.image_url || ""}
//                         alt="Bottom"
//                       />
//                     </div>
//                   </div>
//                   <button
//                     className="delete-button"
//                     onClick={() => handleSubmit(outfit._id)}
//                     disabled={loading || !!error}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };
// };
// export default Saved;
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

  console.log("Fetched outfits:", data); // Debugging

  const handleDelete = async (id: string) => {
    try {
      await deleteOutfit({
        variables: { id }, // Ensure mutation structure matches GraphQL schema
      });
    } catch (error) {
      console.error("Error deleting outfit:", error);
    }
  };

  return (
    <main className="container mt-5">
      <h1
        className="text-center text-white p-3 rounded"
        style={{ backgroundColor: "#7669EA" }}
      >
        Your Saved Outfits
      </h1>
      <div className="row mt-4">
        {data?.myOutfits?.length === 0 ? (
          <p className="text-center">You don't have any saved outfits yet.</p>
        ) : (
          data?.myOutfits?.map((outfit: any) => (
            <div key={outfit._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#FFBE98" }}
                >
                  <h5 className="card-title text-center">
                    Outfit ID: {outfit._id}
                  </h5>
                  <div className="d-flex justify-content-center">
                    <div className="me-2">
                      <img
                        src={outfit.topId?.image_url || ""}
                        alt="Top"
                        className="img-fluid rounded"
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <img
                        src={outfit.bottomId?.image_url || ""}
                        alt="Bottom"
                        className="img-fluid rounded"
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <button
                    className="btn uniform-button w-100 mt-3"
                    style={{ backgroundColor: "#7669EA", color: "white" }}
                    onClick={() => handleDelete(outfit._id)}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete Outfit"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Saved;
