import {Navigate, useLocation, Outlet} from "react-router-dom";
import {Paper} from "@mui/material";

function RequireAuth() {
    const location = useLocation();
    const sessionId = localStorage.getItem("sessionId");
    console.log(location)

    const content = (
        sessionId !== null
            ? <Outlet/>
            : <Navigate to="/unauthorize" state={{ from : location }} replace/>
    )

    return content;

}

export default RequireAuth;