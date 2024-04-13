import { Link } from "react-router-dom";
import Dropdown from "../../dropdown/Dropdown";

const PublicLinks = () => {
    return (
        <>
            <li>
                <Link to="/" aria-label="Home Page">Home</Link>
            </li>
            <li>
                <Link to="/public-guilds" aria-label="Guilds Page">Guilds</Link>
            </li>
            <li>
                <Link to="/mounts" aria-label="Mounts Page">Mounts</Link>
            </li>
            <li>
                <Link to="/dungeons" aria-label="Mythic+ Leaderboard">Mythic+ Leaderboard</Link>
            </li>
            <li>
                <Link to="/dungeons" aria-label="Mythic+ Leaderboard">World of Warcraft</Link>
                <Dropdown />
            </li>
        </>
    )
};

export default PublicLinks;