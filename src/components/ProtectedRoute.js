import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import UseAuth from "../utils/useAuth"

import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const ProtectedRoute = ({allowedRoles}) => {
  const location = useLocation();
  const roles =UseAuth()
  const role=roles.roles

  
  
  const content = (
    
    roles&& allowedRoles.includes(role)
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
)




return content
  //  https://github.com/gitdagray/mern_stack_course/blob/main/lesson_11-frontend/src/features/auth/RequireAuth.js     link to referr protected rotes
};

export default ProtectedRoute;
