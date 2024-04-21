import {Routes, Route} from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import UserHome from '../../pages/user-page/UserHome';
import HomePage from '../../pages/home-page/HomePage';
import Register from '../../pages/register-page/Register';
import Login from '../../pages/login-page/Login';
import PublicGuilds from '../../pages/guilds-page/PublicGuilds';
import Mounts from '../../pages/mounts-page/Mounts';
import Dungeons from '../../pages/dungeons-page/Dungeons';
import WoWProfile from '../../pages/wow-pages/wow-profile-page/WoWProfile';
import Resources from '../../pages/wow-pages/wow-components/resource-comonents/Resources';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/public-guilds' element={<PublicGuilds />} />
            <Route path='/mounts' element={<Mounts />} />
            <Route path='/dungeons' element={<Dungeons />} />
            <Route path='/resources' element={<Resources />} />
            <Route path='/wow-profile' element={<WoWProfile />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoutes />} >
                <Route path='/my-profile' element={<UserHome />} />
            </Route>
        </Routes>
    );
};

export default RoutesComponent;