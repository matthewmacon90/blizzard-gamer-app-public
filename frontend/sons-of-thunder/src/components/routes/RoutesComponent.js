import {Routes, Route} from 'react-router-dom';
import UserHome from '../user-page/UserHome';
import HomePage from '../home-page/HomePage';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/my-profile' element={<UserHome />} />
        </Routes>
    );
};

export default RoutesComponent;