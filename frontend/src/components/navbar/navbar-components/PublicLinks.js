import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../dropdown/Dropdown";
import links from '../../../data/links/publicLinks';

const PublicLinks = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, []);

    const handleClick = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <>
            <li>
                <Link className="nav-link-styles" to="/">Home</Link>
            </li>
            <li>
                <div className="dropdown-container"  ref={dropdownRef}>
                    <button onClick={handleClick} className="nav-button-styles">World of Warcraft</button>
                    {showDropdown && <Dropdown links={links} />}
                </div>
            </li>
        </>
    )
};

export default PublicLinks;