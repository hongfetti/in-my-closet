import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for authentication logic
    if (username === "admin" && password === "password") {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ width: "550px", backgroundColor: "#ffbe98" }}>
      <h1 className="text-center mb-4" style={{ color: "#7669ea" }}>Login</h1>        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: "#7669ea", color: "white" }}>Login</button>
          </form>
      </div>
    </main>
  );
};

export default Login;

