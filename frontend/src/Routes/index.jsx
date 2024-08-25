import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import SignUp from "../Pages/SignUp.jsx";
import AdminPanel from "../Pages/AdminPanel.jsx";
import AllUsers from "../Pages/AllUsers.jsx";
import AllProducts from "../Pages/AllProducts.jsx";
import CategoryProduct from "../Pages/CategoryProduct.jsx";
import ProdcutDetails from "../Pages/ProdcutDetails.jsx";
import ProtectedRoute from "../Components/ProtectedRoute.jsx";
import Cart from "../Pages/Cart.jsx";
import SearchProduct from "../Pages/SearchProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />
      },
      {
        path:"cart",
        element:<Cart/>

      },
      {
        path: "search",
        element: <SearchProduct />

      },
      {
        path: "product/:id",
        element: <ProdcutDetails />
      },
      {
        path: "admin",
        element: <ProtectedRoute />, // Wrap admin routes with ProtectedRoute
        children: [
          {
            path: "",
            element: <AdminPanel />,
            children: [
              {
                path: "all-users",
                element: <AllUsers />
              },
              {
                path: "all-products",
                element: <AllProducts />
              }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;
