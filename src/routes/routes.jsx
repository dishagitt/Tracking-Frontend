import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/home/Home";
import RegisterTeamMember from "../pages/teamLeader/registerTeamMember/RegisterTeamMember";
import TeamProfile from "../pages/teamLeader/teamProfile/TeamProfile";

const CustomRoutes = () => {
    return(
        <Routes>

             {/* Redirect base route to login */}
             <Route path="/" element={<Navigate to={AppRoutes.LOGIN} />} />

             {/* ----------- Public Routes ----------- */}
             <Route path={AppRoutes.REGISTER} element={<Register />} />
             <Route path={AppRoutes.LOGIN} element={<Login />} />
             <Route path={AppRoutes.ADMIN_LOGIN} element={<Login />} />
             
             <Route path={AppRoutes.USER_BASE} element={<UserLayout />}>

                <Route
                    path={AppRoutes.USER_HOME}
                    element={<Home />} 
                />
                <Route 
                    path={AppRoutes.REGISTER_TEAM_MEMBER} 
                    element={<RegisterTeamMember />} 
                />
                 <Route 
                    path={AppRoutes.TEAM_INFO} 
                    element={<TeamProfile />} 
                />


             </Route>




        </Routes>
    )
}

export default CustomRoutes;