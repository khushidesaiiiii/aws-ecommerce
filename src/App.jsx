import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PublicLayout from "./layout/PublicLayout";
import NoNavbarFooter from "./layout/NoNavbarFooter";

import Home from "./pages/Home/index";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ConfirmSignup from "./pages/Auth/ConfirmSignup";
import AboutUs from "./pages/Home/About";
import Products from "./pages/Products/Products";
import Category from "./pages/Products/Category";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./redux/authSlice";
import ProductsByCategory from "./pages/Products/ProductsByCategory";
import ProductsDetail from "./pages/Products/ProductsDetail";
import { fetchCart } from "./redux/cartSlice";
import ProtectedLayout from "./layout/ProtectedLayout";
import CartController from "./components/Cart";
import Order from "./pages/Order/Order";
import Dashboard from "./pages/Admin/Dashboard";
import AdminOrders from "./pages/Admin/Admin-Orders/OrdersPage";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import AdminChats from "./pages/Admin/Admin-chats/index";
import ChatBot from "./components/Chat";
import AdminChatRoom from "./pages/Admin/Admin-chats/AdminChatRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "product", element: <Products /> },
      { path: "product/:productId", element: <ProductsDetail /> },
      { path: "category", element: <Category /> },
      { path: "category/:categoryName", element: <ProductsByCategory /> },
    ],
  },
  {
    path: "/",
    element: <NoNavbarFooter />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "confirm", element: <ConfirmSignup /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { path: "cart", element: <CartController allowedRoles={["USER"]} /> },
      { path: "order", element: <Order allowedRoles={["USER"]} /> },
      { path: "profile", element: <Profile allowedRoles={["USER"]} /> },
      // { path: "chat", element: <Chat allowedRoles={["USER"]} /> },

      { path: "dashboard", element: <Dashboard allowedRoles={["ADMIN"]} /> },
      {
        path: "admin/orders",
        element: <AdminOrders allowedRoles={["ADMIN"]} />,
      },
      {
        path: "admin/chats",
        element: <AdminChats allowedRoles={["ADMIN"]} />,
      },
      {
        path: "admin/chat/:userId",
        element: <AdminChatRoom allowedRoles={["ADMIN"]} />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  const userRole = useSelector((state) => state.auth?.userRole);

  return (
    <>
      <RouterProvider router={router} />
      {userRole === "USER" ? <ChatBot /> : ""}
      <ToastContainer />
    </>
  );
}

export default App;
