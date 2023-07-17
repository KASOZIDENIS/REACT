import { Navigate, Outlet } from "react-router-dom";
import Register from "./components/Register";
// import Register from "./components/Register";

const useAuth = ()=>{
    const user = {loggedIn:false};
    return user && user.loggedIn;
};
const ProtectedRoutes = () =>{
    const isAuth = useAuth();
    return isAuth? <Outlet />: <Navigate to ="/"/> && <Register/>;
};

export default ProtectedRoutes;