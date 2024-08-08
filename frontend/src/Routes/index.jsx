import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import SignUp from "../Pages/SignUp.jsx";
import AdminPanel from "../Pages/AdminPanel.jsx";
import AllUsers from "../Pages/AllUsers.jsx";
import AllProducts from "../Pages/AllProducts.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },{
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
              path: "admin",
                element: <AdminPanel />,
               children:[
                {
                    path:"all-users",
                    element:<AllUsers/>
                },
                {
                    path:"all-products",
                    element:<AllProducts/>
                },



               ]
            }
        ],
    }
])

export default router;