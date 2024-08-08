import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {

    const user = JSON.parse(localStorage.getItem('user')) || null
    const role = user?.user_role || ''

    const location = useLocation()
    
    return (
        allowedRoles?.find( allowedRole => allowedRole === role )
            ? <Outlet />
            : user
                ? <Navigate to="/aqs/unothaurized"  state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    )
}

export default RequireAuth;