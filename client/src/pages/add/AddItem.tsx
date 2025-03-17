import { useState } from "react";
import "./add.css";
import UploadWidget from "../../components/Widget";
import { useMutation } from "@apollo/client";

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

  return (
    


        {/* Color Dropdown */}
        <div className="dropdown btn-group">
          <button
            className="btn btn-secondary btn-lg dropdown-toggle"
            type="button"
            onClick={() => toggleDropdown("color")}
            aria-expanded={openDropdown === "color"}
          >
            {selectedItems.color}
          </button>
          {openDropdown === "color" && (
            <ul className="dropdown-menu show">
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Red")}
              >
                Red
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Green")}
              >
                Green
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Blue")}
              >
                Blue
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Yellow")}
              >
                Yellow
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Orange")}
              >
                Orange
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Pink")}
              >
                Pink
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Black")}
              >
                Black
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "White")}
              >
                White
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Grey")}
              >
                Grey
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("color", "Multi-Color")}
              >
                Multi-Color
              </li>
            </ul>
          )}
        </div>

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

        <button type="button" className="btn btn-primary">
          Add to closet
        </button>
      </form>
    </main>
  );
};

export default Add;
