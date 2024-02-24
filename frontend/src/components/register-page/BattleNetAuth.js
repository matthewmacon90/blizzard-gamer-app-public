import { Link } from "react-router-dom";
import Api from "../../api";

const BattleNetAuth = () => {
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
            <button className="battlenet-link-button" aria-label="Battlenet Link Account" onClick={linkBattleNetAccount}>
                Link Battle.net Account
            </button>
        </div>
    );
};

export default BattleNetAuth;