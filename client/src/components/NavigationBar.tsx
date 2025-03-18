import { Link } from "react-router-dom";
import logo from "../assets/in-my-closet-header-pic.png"; 

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ffbe98" }}>
      <div className="container">
       
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="380" height="120" />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;




