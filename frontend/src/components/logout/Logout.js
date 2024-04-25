import { useNavigate } from 'react-router-dom';

const Logout = ({setCurrentUser}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        setCurrentUser(null);
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <button className="nav-button-styles" onClick={handleClick}>
            Logout
        </button>
    );
};

export default Logout;