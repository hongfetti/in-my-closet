import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER } from "../utils/queries";
import { ClothingItems } from "../interfaces/ClothingItems";
import { DELETE_CLOTHING_ITEM } from "../utils/mutations" 

const Wardrobe = () => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER);
  const [deleteClothingItem] = useMutation(DELETE_CLOTHING_ITEM)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data)
const handleSubmit = async (id:string) => {
  try {
    const { data } = await deleteClothingItem({
      variables: {
        input: {id}
      }
    }) 
    refetch ()
  } catch (error) {
    console.error(error);
  }
}

  return (
    <main className="container mt-5">
      <h1 className="text-center" style={{ backgroundColor: '#7669EA', color: 'white', padding: '10px', borderRadius: '10px' }}>My Wardrobe</h1>
      <div className="row mt-4">
        {data?.currentUser?.clothingItems?.map((item: ClothingItems, index: number) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img src={item.image_url} className="card-img-top" alt={item.articleType} style={{ height: '300px', objectFit: 'cover' }} />
              <div className="card-body" style={{ backgroundColor: '#FFBE98' }}>
                <h5 className="card-title">{item.articleType}</h5>
                <p className="card-text">Color: {item.color}</p>
                <p className="card-text">Size: {item.size}</p>
                <p className="card-text">Season: {item.season}</p>
                <button 
                type="button"
                className="btn uniform-button"
          style={{ backgroundColor: "#7669EA", color: "white" }}
          onClick={() => handleSubmit(item._id)}
          disabled={loading || !!error}
        >
          {loading ? "Deleting..." : "As If! DELETE."}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Wardrobe;

