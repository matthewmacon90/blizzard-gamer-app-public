import {Routes, Route} from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import UserHome from '../../pages/user-page/UserHome';
import HomePage from '../../pages/home-page/HomePage';
import Register from '../../pages/register-page/Register';
import Login from '../../pages/login-page/Login';


const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoutes />} >
                <Route path='/my-profile' element={<UserHome />} />
            </Route>
        </Routes>
    );
};

export default RoutesComponent;