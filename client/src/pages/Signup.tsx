// const Signup = () => {

//     return (
//       <main>
//         <h1>Sign Up</h1>
//       </main>
//     );
//   };
  
//   export default Signup;
  
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

const Signup: React.FC = () => {
  return (
    <div className="signup-container">
      <div className="logo">IN MY CLOSET</div>
      <h2 className="text-center">SIGNUP:</h2>
      <form className="signup-form">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" className="form-control" id="username" placeholder="Enter username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
