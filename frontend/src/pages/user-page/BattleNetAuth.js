import { Link, Navigate } from "react-router-dom";
import Api from "../../api";

const BattleNetLink = () => {
    async function linkBattleNetAccount() {
        try {
            const result = await Api.linkBattleNetAccount();
            console.log('RESULT: ', result);
        } catch (err) {
            console.error(err);
        }
    };



    return (
        <div className="battlenet-container"> 
            {/* <button className="battlenet-link-button" aria-label="Battlenet Link Account" onClick={linkBattleNetAccount}>
                Link Battle.net Account
            </button> */}
            <button className="battlenet-link-button" aria-label="Battlenet Link Account">
                <a href='http://localhost:3001/battlenet'>Link Battle.net Account</a>
            </button>
        </div>
    );
};

export default BattleNetLink;