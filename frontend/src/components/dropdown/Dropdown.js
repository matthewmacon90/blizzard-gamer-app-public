import { useContext } from "react";
import AuthContext from "../../context/authContext";
import AuthenticatedLinks from "./dropdown-components/AuthenticatedLinks";
import UnauthenticatedLinks from "./dropdown-components/UnauthenticatedLinks";
import './DropdownStyles.css';

const Dropdown = ({links}) => {
    const auth = useContext(AuthContext);
    const { currentUser } = auth;
    console.log('currentUser', currentUser);

    return (
        <ul className="dropdown-links-list">

            {currentUser ? (
                    <AuthenticatedLinks links={links} />
                ) : (
                    <UnauthenticatedLinks links={links} />
                )
            }
        </ul>
    )
};

export default Dropdown;