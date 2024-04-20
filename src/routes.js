import {
  createBrowserRouter,
  Outlet,
  Navigate,
  redirect,
} from "react-router-dom";
import Header from "./Pages/Header/header";
import CategoriesSection from "./Pages/CategoriesSection/CategoriesSection";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart";
import ProductsList from "./Shared/ProductsList/ProductList";
import ServicesSection from "./Pages/ServicesSection/CategoriesSection";
import Footer from "./Pages/Footer/footer";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Profile from "./Pages/UserProfile/Profile";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import AllProducts from "./Pages/Shop/Shop";
import AllOrders from "./Pages/orders/Orders";
import OrderItems from "./Pages/OrderItems/OrderItems";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import NotFound from "./Pages/NotFound/NotFound";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const ProtectedLayout = () => {
  if ( !localStorage.getItem( "Token" ) )
  {
    return redirect("/login");
  }
  else {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }
};
function PrivateRoute({ children }) {
  //const isAuthenticated = checkUserAuthentication();
  return (localStorage.getItem("Token"))? children : <Navigate to="/login" />;
}

 /* const router = createBrowserRouter([
   {
     path: "/account",
     element: (
       <PrivateRoute>
         <Profile />
       </PrivateRoute>
     ),
   },
   {
     path: "/login",
     element: (
       <>
      <Header />
      <Login />
      <Footer />
       </>
     ),
   },
   // Other routes...
 ]);
 */


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <>
            {" "}
            <CategoriesSection /> <ProductsList /> <ServicesSection />{" "}
          </>
        ),
      },
      {
        path: "/shop",
        element: <AllProducts />,
      },
      ,
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/account",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            < Wishlist />
          </PrivateRoute>
        )
      },
      {
        path: "/updateprofile",
        element:
          (<PrivateRoute>
            <UpdateProfile />,
          </PrivateRoute>

          )
      },
      {
        path: "/orders",
        element: <AllOrders />,
      },
      {
        path: "/order-details/:id",
        element: <OrderItems />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
