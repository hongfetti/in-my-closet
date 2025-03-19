import { useMutation } from "@apollo/client";
// import { useState } from "react";
import { ADD_OUTFIT } from "../utils/mutations";
import { bottle } from "@cloudinary/url-gen/qualifiers/focusOn";

interface SaveOutfitButtonProps {
  topId: string | null;
  bottomId: string | null;
}

const SaveOutfitButton: React.FC<SaveOutfitButtonProps> = ({
  topId,
  bottomId,
}) => {
  const [addOutfit, { loading, error }] = useMutation(ADD_OUTFIT);

  const handleSaveOutfit = async () => {
    if (!topId || !bottomId) {
      alert("Please select two items to save an outfit.");
      return;
    }
    console.log("TOP AND BOTTOM:", topId, bottomId);
    try {
      await addOutfit({
        variables: {
          input: {
            topId, // Ensure topId is not null or undefined
            bottomId,
            // Add other required fields if needed
          },
        },
      });
      alert("Outfit saved!");
    } catch (err) {
      console.error("Error saving outfit:", err);
    }
  };

  return (
    <button onClick={handleSaveOutfit} disabled={loading}>
      {loading ? "Saving..." : "Save This Outfit!"}
    </button>
  );
};

export default SaveOutfitButton;
