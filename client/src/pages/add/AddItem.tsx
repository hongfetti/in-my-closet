import { useState } from "react";
import "./add.css";
import UploadWidget from "../../components/Widget";
import { useMutation } from "@apollo/client";
import { ADD_CLOTHING_ITEM } from "../../utils/mutations";
type DropdownKey = "articleType" | "size" | "color" | "season";

const Add = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    Record<DropdownKey, string> & { image_url: string } //!! tacked this on here
  >({
    articleType: "Article type",
    size: "Size",
    color: "Color",
    season: "Season",
    //!!Adding image url here as empty string
    image_url: "",
  });

  const [addClothingItem,  {loading, error} ] = useMutation(ADD_CLOTHING_ITEM); //!!Added use mutation stuff here


  const toggleDropdown = (dropdownName: DropdownKey) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleSelect = (dropdownName: DropdownKey, item: string) => {
    setSelectedItems((prev) => ({ ...prev, [dropdownName]: item }));
    setOpenDropdown(null); // Close dropdown after selection
  };
  //!!Chad's Change below
  const handleImageUpload = (url: string) => {
    setSelectedItems((prev) => ({ ...prev, image_url: url }));
  };
console.log(selectedItems)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await addClothingItem({
        variables: {
          input: selectedItems, 
        },
      });
      console.log("Mutation Success:", data);
      
    } catch (error) {
      console.error("Mutation Error So So Sad...:", error);
    }
  };

  return (
    


    <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
  <h1 className="add-item-title">ADD ITEM</h1>

  <form className="form d-flex flex-column align-items-center w-100">
    {/* Article Type Dropdown */}
    <div className="dropdown btn-group w-50 text-center">
      <button
        className="btn dropdown-toggle w-100 py-2"
        type="button"
        onClick={() => toggleDropdown("articleType")}
        aria-expanded={openDropdown === "articleType"}
      >
        {selectedItems.articleType}
      </button>
      {openDropdown === "articleType" && (
        <ul className="dropdown-menu show w-100 text-center">
          <li className="dropdown-item" onClick={() => handleSelect("articleType", "TOP")}>TOP</li>
          <li className="dropdown-item" onClick={() => handleSelect("articleType", "BOTTOM")}>BOTTOM</li>
          <li className="dropdown-item" onClick={() => handleSelect("articleType", "DRESS/JUMPSUIT")}>DRESS/JUMPSUIT</li>
          <li className="dropdown-item" onClick={() => handleSelect("articleType", "SHOES")}>SHOES</li>
          <li className="dropdown-item" onClick={() => handleSelect("articleType", "OUTERWEAR")}>OUTERWEAR</li>
          <li className="dropdown-item" onClick={() => handleSelect("articleType", "ACCESSORIES")}>ACCESSORIES</li>
        </ul>
      )}
    </div>

  
    <div className="dropdown btn-group w-50 text-center mt-3">
      <button
        className="btn dropdown-toggle w-100 py-2"
        type="button"
        onClick={() => toggleDropdown("size")}
        aria-expanded={openDropdown === "size"}
      >
        {selectedItems.size}
      </button>
      {openDropdown === "size" && (
        <ul className="dropdown-menu show w-100 text-center">
          <li className="dropdown-item" onClick={() => handleSelect("size", "XS")}>XS</li>
          <li className="dropdown-item" onClick={() => handleSelect("size", "S")}>S</li>
          <li className="dropdown-item" onClick={() => handleSelect("size", "M")}>M</li>
          <li className="dropdown-item" onClick={() => handleSelect("size", "L")}>L</li>
          <li className="dropdown-item" onClick={() => handleSelect("size", "XL")}>XL</li>
        </ul>
      )}
    </div>

    <div className="dropdown btn-group w-50 text-center mt-3">
      <button
        className="btn dropdown-toggle w-100 py-2"
        type="button"
        onClick={() => toggleDropdown("color")}
        aria-expanded={openDropdown === "color"}
      >
        {selectedItems.color}
      </button>
      {openDropdown === "color" && (
        <ul className="dropdown-menu show w-100 text-center">
          <li className="dropdown-item" onClick={() => handleSelect("color", "RED")}>RED</li>
          <li className="dropdown-item" onClick={() => handleSelect("color", "BLUE")}>BLUE</li>
          <li className="dropdown-item" onClick={() => handleSelect("color", "GREEN")}>GREEN</li>
          <li className="dropdown-item" onClick={() => handleSelect("color", "YELLOW")}>YELLOW</li>
          <li className="dropdown-item" onClick={() => handleSelect("color", "ORANGE")}>ORANGE</li>
          <li className="dropdown-item" onClick={() => handleSelect("color", "PINK")}>PINK</li>
          <li className="dropdown-item" onClick={() => handleSelect("color", "BLACK")}>BLACK</li>
          <li className="dropdown-item" onClick={() => handleSelect("color", "WHITE")}>WHITE</li>
          <li className="dropdown-item" onClick={() => handleSelect("color", "GREY")}>GREY</li>        
          <li className="dropdown-item" onClick={() => handleSelect("color", "MULTI-COLOR")}>MULTI-COLOR</li>
        </ul>
      )}
    </div>

    <div className="dropdown btn-group w-50 text-center mt-3">
      <button
        className="btn dropdown-toggle w-100 py-2"
        type="button"
        onClick={() => toggleDropdown("season")}
        aria-expanded={openDropdown === "season"}
      >
        {selectedItems.season}
      </button>
      {openDropdown === "season" && (
        <ul className="dropdown-menu show w-100 text-center">
          <li className="dropdown-item" onClick={() => handleSelect("season", "WINTER")}>WINTER</li>
          <li className="dropdown-item" onClick={() => handleSelect("season", "SPRING")}>SPRING</li>
          <li className="dropdown-item" onClick={() => handleSelect("season", "SUMMER")}>SUMMER</li>
          <li className="dropdown-item" onClick={() => handleSelect("season", "FALL")}>FALL</li>
        </ul>
      )}
    </div>


        <div className="upload">
          <UploadWidget setImageUrl={handleImageUpload} />
          {selectedItems.image_url && (
            <img
              src={selectedItems.image_url}
              alt="Profile Preview"
              width="400"
            />
          )}
        </div>

        <button type="button" className="btn btn-primary"onClick={handleSubmit} disabled={loading || !!error}> {/*on click stuff here*/}
        {loading ? "Adding..." : "Add to closet"}
        </button>
      </form>
    </main>
  );
};


export default Add;
