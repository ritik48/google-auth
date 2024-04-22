import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../useUserContext";

export function ProtectedRoute() {
    const { user } = useUserContext();

    console.log("protected = ", user);

    return user ? <Outlet /> : <Navigate to={"/login"} />;
}
