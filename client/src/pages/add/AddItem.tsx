import { useState } from "react";
import "./add.css";

type DropdownKey = "articleType" | "size" | "color" | "season";

const Add = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    Record<DropdownKey, string>
  >({
    articleType: "Article type",
    size: "Size",
    color: "Color",
    season: "Season",
  });

  const toggleDropdown = (dropdownName: DropdownKey) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleSelect = (dropdownName: DropdownKey, item: string) => {
    setSelectedItems((prev) => ({ ...prev, [dropdownName]: item }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  return (
    <main>
      <h1>Add Items</h1>
      <form className="form">
        {/* Article Type Dropdown */}
        <div className="dropdown btn-group">
          <button
            className="btn btn-secondary btn-lg dropdown-toggle"
            type="button"
            onClick={() => toggleDropdown("articleType")}
            aria-expanded={openDropdown === "articleType"}
          >
            {selectedItems.articleType}
          </button>
          {openDropdown === "articleType" && (
            <ul className="dropdown-menu show">
              <li
                className="dropdown-item"
                onClick={() => handleSelect("articleType", "Top")}
              >
                Top
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("articleType", "Bottom")}
              >
                Bottom
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("articleType", "Dress/Jumpsuit")}
              >
                Dress/Jumpsuit
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("articleType", "Shoes")}
              >
                Shoes
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("articleType", "Outerwear")}
              >
                Outerwear
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("articleType", "Accessories")}
              >
                Accessories
              </li>
            </ul>
          )}
        </div>

        {/* Size Dropdown */}
        <div className="dropdown btn-group">
          <button
            className="btn btn-secondary btn-lg dropdown-toggle"
            type="button"
            onClick={() => toggleDropdown("size")}
            aria-expanded={openDropdown === "size"}
          >
            {selectedItems.size}
          </button>
          {openDropdown === "size" && (
            <ul className="dropdown-menu show">
              <li
                className="dropdown-item"
                onClick={() => handleSelect("size", "OS")}
              >
                OS
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("size", "XS")}
              >
                XS
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("size", "S")}
              >
                S
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("size", "M")}
              >
                M
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("size", "L")}
              >
                L
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("size", "XL")}
              >
                XL
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("size", "XXL")}
              >
                XXL
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("size", "3XL")}
              >
                3XL
              </li>
            </ul>
          )}
        </div>

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

        {/* Season Dropdown */}
        <div className="dropdown btn-group">
          <button
            className="btn btn-secondary btn-lg dropdown-toggle"
            type="button"
            onClick={() => toggleDropdown("season")}
            aria-expanded={openDropdown === "season"}
          >
            {selectedItems.season}
          </button>
          {openDropdown === "season" && (
            <ul className="dropdown-menu show">
              <li
                className="dropdown-item"
                onClick={() => handleSelect("season", "Spring")}
              >
                Spring
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("season", "Summer")}
              >
                Summer
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("season", "Fall")}
              >
                Fall
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleSelect("season", "Winter")}
              >
                Winter
              </li>
            </ul>
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
