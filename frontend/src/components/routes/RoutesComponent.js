import {Routes, Route} from 'react-router-dom';
import UserHome from '../user-page/UserHome';
import HomePage from '../home-page/HomePage';
import Register from '../register-page/Register';
import Login from '../login-page/Login';


const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/my-profile' element={<UserHome />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
};

export default RoutesComponent;