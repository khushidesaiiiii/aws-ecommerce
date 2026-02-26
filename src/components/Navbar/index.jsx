import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { logout } from "../../redux/authSlice";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
} from "reactstrap";

import CartController from "../Cart";
import { subscribeToCart } from "../../services/cartService";
import { useEffect } from "react";
import { setCart } from "../../redux/cartSlice";

export default function Navbar() {
  const { userRole, user } = useSelector((state) => state.auth);
  //console.log(user);
  //debugger;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = subscribeToCart((cart) => {
      dispatch(setCart(cart));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
      navigate("/", { replace: true });
    } else {
      navigate("/login");
    }
  };

  const email = localStorage.getItem("email") || (user ? user.email : null);

  return (
    <>
      <div className="nav-bar">
        <div className="logo">
          <NavLink
            to={userRole === "ADMIN" ? "/dashboard" : "/"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            EVARA
          </NavLink>
        </div>
        {userRole === "ADMIN" && (
          <>
            <div className="navlinks-center">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                User Orders
              </NavLink>
              <NavLink
                to="/admin/chats"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Chats
              </NavLink>{" "}
            </div>
          </>
        )}
        {userRole !== "ADMIN" && (
          <>
            <div className="navlinks-center">
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About Us
              </NavLink>

              <NavLink
                to="/product"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Products
              </NavLink>
              <NavLink
                to="/category"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Category
              </NavLink>
              {userRole === "USER" && (
                <>
                  <UncontrolledDropdown inNavbar>
                    <DropdownToggle nav caret>
                      User
                    </DropdownToggle>
                    <DropdownMenu right>
                      <NavLink
                        to="/order"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <DropdownItem>Orders </DropdownItem>
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <DropdownItem>Profile </DropdownItem>
                      </NavLink>
                    </DropdownMenu>{" "}
                  </UncontrolledDropdown>
                </>
              )}
            </div>
          </>
        )}
        <div className="nav-user-section">
          {userRole === "USER" && (
            <>
              <CartController />
              <p className="username">{email?.slice(0, email.indexOf("@"))}</p>
            </>
          )}

          <Button onClick={handleLogout}>{user ? "Logout" : "Login"}</Button>
        </div>
      </div>
    </>
  );
}
