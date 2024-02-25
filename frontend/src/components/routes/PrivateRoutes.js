import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const PrivateRoutes = () => {
    const currentToken = useContext(AuthContext);
    const auth = {'token': currentToken.currentUser};
    return auth.token === null ? <Navigate to="/login" /> : <Outlet /> ;
};

export default PrivateRoutes;
