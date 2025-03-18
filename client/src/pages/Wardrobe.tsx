
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IOutfit {
  _id: string;
  name: string;
  imageUrl: string;
}

interface ClothingItem {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
  category: string;
}

interface Wardrobe {
  outfits: IOutfit[];
  clothingItems: ClothingItem[];
}

const WardrobeProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get user ID from URL params
  const [wardrobe, setWardrobe] = useState<Wardrobe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/wardrobe`);
        if (!response.ok) {
          throw new Error("Failed to fetch wardrobe data");
        }
        const data: Wardrobe = await response.json();
        setWardrobe(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWardrobe();
  }, [userId]);

  if (loading) return <p>Loading wardrobe...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900">Wardrobe</h2>

     
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Outfits</h3>
        <div className="grid grid-cols-2 gap-4">
          {wardrobe?.outfits.map((outfit) => (
            <div key={outfit._id} className="bg-gray-100 p-4 rounded-lg shadow">
              <img src={outfit.imageUrl} alt={outfit.name} className="w-full h-40 object-cover rounded-lg"/>
              <p className="text-center mt-2">{outfit.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Clothing Items</h3>
        <div className="grid grid-cols-2 gap-4">
          {wardrobe?.clothingItems.map((item) => (
            <div key={item._id} className="bg-gray-100 p-4 rounded-lg shadow">
              <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded-lg"/>
              <p className="text-center mt-2">{item.name} ({item.category})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardrobeProfile;
