import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/home/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ErrorPage from "./pages/Error";
import Add from "./pages/add/AddItem";
import Saved from "./pages/SavedOutfits";
import Wardrobe from "./pages/Wardrobe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/wardrobe",
        element: <Wardrobe />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
