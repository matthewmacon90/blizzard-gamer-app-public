import { Link } from "react-router-dom";

const UnauthenticatedLinks = ({links}) => {
    return (
        <>
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

export default UnauthenticatedLinks;