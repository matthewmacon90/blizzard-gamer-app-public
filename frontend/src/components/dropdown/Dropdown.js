import { useContext } from "react";
import AuthContext from "../../context/authContext";
import AuthenticatedLinks from "./dropdown-components/AuthenticatedLinks";
import UnauthenticatedLinks from "./dropdown-components/UnauthenticatedLinks";
import './DropdownStyles.css';

const Dropdown = ({links}) => {
    const auth = useContext(AuthContext);

    return (
        <ul className="dropdown-links-list">
            {auth.currentUser ? (
                    <AuthenticatedLinks links={links} />
                ) : (
                    <UnauthenticatedLinks links={links} />
                )
            }
        </ul>
    )
};

export default Dropdown;