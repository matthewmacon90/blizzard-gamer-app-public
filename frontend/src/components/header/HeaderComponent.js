import logo from '../../pictures/logo.jpg';
import NavBar from '../navbar/NavBar';
import './HeaderStyles.css';

const HeaderComponent = () => {
    return (
        <header className="header-container">
            <img className='header-logo' src={logo} alt="Sons of Thunder Logo" />
            <NavBar />
        </header>
    );
};

export default HeaderComponent;
