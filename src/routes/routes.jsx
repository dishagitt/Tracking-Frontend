import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/home/Home";
import RegisterTeamMember from "../pages/teamLeader/registerTeamMember/RegisterTeamMember";
import TeamProfile from "../pages/teamLeader/teamProfile/TeamProfile";
import HackathonStageTracker from "../pages/teamLeader/stageTracker/HackathonStageTracker";
import ResourceRequest from "../pages/teamLeader/resourceRequest/ResourceRequest";
import UserProfile from "../components/userProfile/UserProfile";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminProfile from "../admin/adminComponents/adminProfile/AdminProfile";
import AdminDashboard from "../admin/AdminPages/adminDashboard/AdminDashboard";
import AdminAnnouncement from "../admin/AdminPages/announcement/AdminAnnouncement";
import ManageUserTypes from "../admin/AdminPages/manageUserTypes/ManageUserTypes";
import ManageBranches from "../admin/AdminPages/manageBranches/ManageBranches";

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
                <Route 
                    path={AppRoutes.HACKATHON_PROGRESS} 
                    element={<HackathonStageTracker />} 
                />
                <Route 
                    path={AppRoutes.RESOURCE_REQUEST} 
                    element={<ResourceRequest />} 
                />
                <Route 
                    path={AppRoutes.USER_PROFILE} 
                    element={<UserProfile />} 
                />

             </Route>


             <Route path={AppRoutes.ADMIN_BASE} element={<AdminLayout />}>

                <Route 
                    path={AppRoutes.ADMIN_DASHBOARD} 
                    element={<AdminDashboard />} 
                />
                <Route 
                    path={AppRoutes.ADMIN_PROFILE} 
                    element={<AdminProfile />} 
                />
                 <Route 
                    path={AppRoutes.ADMIN_ANNOUNCEMENT} 
                    element={<AdminAnnouncement />} 
                />
                <Route 
                    path={AppRoutes.ADMIN_USER_TYPES} 
                    element={<ManageUserTypes />} 
                />
                <Route 
                    path={AppRoutes.ADMIN_BRANCHES} 
                    element={<ManageBranches />} 
                />

            </Route>

        </Routes>
    )
}

export default CustomRoutes;