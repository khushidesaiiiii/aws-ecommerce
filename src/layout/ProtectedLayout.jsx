import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/index";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer/index";

export default function ProtectedLayout({ allowedRoles }) {
  const { userRole, user, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {userRole === "USER" ? (
        <>
          <Navbar />
          <Outlet />

          <Footer />
        </>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
}
