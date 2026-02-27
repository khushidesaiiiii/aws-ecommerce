import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";

export default function PublicLayout() {
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}