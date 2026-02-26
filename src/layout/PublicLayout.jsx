import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/Footer";

export default function PublicLayout() {
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}