import { Link } from "react-router-dom";

const BattleNetAuth = () => {
    return (
        <div className="battlenet-container"> 
            <button className="battlenet-signup-button" aria-label="Battlenet Sign Up">
                <Link to="http://localhost:3001/battlenet">Sign Up with Battle.net</Link>
            </button>
        </div>
    );
};

export default BattleNetAuth;