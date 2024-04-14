import { Link } from "react-router-dom";
import './DropdownStyles.css';

const Dropdown = ({links}) => {
    return (
        <ul className="dropdown-links-list">
            {links.map((link) => {
                return (
                    <li className="dropdown-links-list-li" key={link.id}>
                        <Link className="dropdown-links-styles" to={link.link}>{link.name}</Link>
                    </li>
                )
            })}
        </ul>
    )
};

export default Dropdown;