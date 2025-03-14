import { Link } from "react-router-dom";

const  NavigationBar = () => {
  return (
    <ul className="nav nav-tabs" style={{display: "flex", listStyle: "none"}}>
      <li className="nav-item" style={{padding: '0 10px'}}>
        <Link to="/">
          <h1 className="m-0">Home</h1>
        </Link>
      </li>
      <li className="nav-item" style={{padding: '0 10px'}}>
      <Link  to="/login">
          <h1 className="m-0">Login</h1>
        </Link>
      </li>
      <li className="nav-item" style={{padding: '0 10px'}}>
      <Link  to="/signup">
          <h1 className="m-0">Sign Up</h1>
        </Link>
      </li>
    </ul>
  );
}

export default NavigationBar;
