import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import Register from "../pages/auth/Register";

const CustomRoutes = () => {
    return(
        <Routes>
             <Route path={AppRoutes.REGISTER} element={<Register />} />
        </Routes>
    )
}

export default CustomRoutes;