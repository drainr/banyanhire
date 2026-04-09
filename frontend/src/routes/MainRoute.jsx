import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/LoginForm.jsx";



const MainRoute = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />



            {/* Private */}
            <Route element={<PrivateRoute />}>
                <Route element={<Root />}>
                    </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default MainRoute;