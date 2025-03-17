// const Saved = () => {
//   return (
//     <main>
//       <h1>Saved Outfits</h1>
//     </main>
//   );
// };

// export default Saved;


import React from "react";

const SavedOutfits: React.FC = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column align-items-center py-4">
      {/* Header */}
      <div className="w-100 bg-warning d-flex justify-content-between align-items-center p-3">
        <div className="fw-bold fs-5">IN MY CLOSET</div>
        <div className="fw-bold fs-4 d-flex align-items-center">
          70° <span className="ms-2">☁️</span>
        </div>
      </div>
      
      {/* Title */}
      <h2 className="text-primary my-3">SAVED OUTFITS</h2>

      {/* Saved Outfits Grid */}
      <div className="row g-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="col-md-3">
            <div className="card shadow" style={{ width: "200px", height: "250px" }}></div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="d-flex justify-content-between w-50 mt-4">
        <button className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
        </button>
        <button className="btn btn-outline-primary">
          <i className="bi bi-arrow-right me-2"></i>
        </button>
      </div>
    </div>
  );
};

export default SavedOutfits;
