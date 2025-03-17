// const Wardrobe = () => {
//   return (
//     <main>
//       <h1>Saved Outfits</h1>
//     </main>
//   );
// };

// export default Wardrobe;


import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sliders, List } from "lucide-react";

const Wardrobe: React.FC = () => {
  return (
    <div className="bg-pink-300 min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <div className="bg-orange-300 w-full flex justify-between items-center p-4">
        <div className="text-lg font-bold">IN MY CLOSET</div>
        <div className="text-xl font-bold flex items-center">
          70° <span className="ml-2">☁️</span>
        </div>
      </div>
      
      {/* Title */}
      <h2 className="text-xl font-bold text-purple-700 my-4">CLOTHING ITEMS</h2>

      {/* Wardrobe Grid */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="w-32 h-32 bg-white shadow-md"></Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between w-full max-w-md mt-4">
        <Button variant="outline">
          <ArrowLeft className="mr-2" />
        </Button>
        <Button variant="outline">
          <ArrowRight className="mr-2" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <Button className="bg-orange-300 text-purple-700">ADD TO CLOSET</Button>
        <Button className="bg-orange-300 text-purple-700">ADD NEW ITEM</Button>
      </div>
    </div>
  );
};

export default Wardrobe;
