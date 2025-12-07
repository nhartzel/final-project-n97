import { Outlet, Navigate } from 'react-router-dom';

// handles availability of protected routes on the front end
const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    
    // If token exists, show the child route (Outlet). Otherwise, bounce to login.
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;