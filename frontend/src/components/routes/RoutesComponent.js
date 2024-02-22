import {Routes, Route} from 'react-router-dom';
import UserHome from '../user-page/UserHome';
import HomePage from '../home-page/HomePage';
import Register from '../register-page/Register';


const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/my-profile' element={<UserHome />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    );
};

export default RoutesComponent;