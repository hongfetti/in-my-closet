// const Login = () => {

//     return (
//       <main>
//         <h1>Login</h1>
//       </main>
//     );
//   };
  
//   export default Login;
  



  import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-300" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/hangers.png')" }}>
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-orange-400 bg-purple-600 px-8 py-4 rounded-full" style={{ fontFamily: 'Comic Sans MS' }}>
          IN MY CLOSET
        </h1>
      </div>
      <div className="bg-transparent p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-lg text-purple-500 mb-6 font-bold">LOGIN:</h2>
        <div className="mb-4">
          <label className="block text-purple-500 font-bold mb-2">Username:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-purple-500 font-bold mb-2">Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;