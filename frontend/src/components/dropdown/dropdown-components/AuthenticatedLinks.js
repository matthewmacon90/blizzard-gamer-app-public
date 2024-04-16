import { Link } from "react-router-dom";

const AuthenticatedLinks = ({links}) => {
    return (
        <>
            <li className="dropdown-links-list-li">
                <Link className="dropdown-links-styles" to="/wow-profile">WoW Profile</Link>
            </li>
            <hr className="drop-down-hr" />
            {links.map((link) => {
                return (
                    <li className="dropdown-links-list-li" key={link.id}>
                        <Link className="dropdown-links-styles" to={link.link}>{link.name}</Link>
                    </li>
                )
            })}
        </>
    )
};

export default AuthenticatedLinks;