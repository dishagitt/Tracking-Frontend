import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import UserLayout from "../layout/UserLayout";

const CustomRoutes = () => {
    return(
        <Routes>

             {/* Redirect base route to login */}
             <Route path="/" element={<Navigate to={AppRoutes.LOGIN} />} />

             {/* ----------- Public Routes ----------- */}
             <Route path={AppRoutes.REGISTER} element={<Register />} />
             <Route path={AppRoutes.LOGIN} element={<Login />} />
             <Route path={AppRoutes.ADMIN_LOGIN} element={<Login />} />
             
             <Route path={AppRoutes.USER_BASE} element={<UserLayout />} />



        </Routes>
    )
}

export default CustomRoutes;