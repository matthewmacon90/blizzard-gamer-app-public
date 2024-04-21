import Api from "../../../api";

const BattleNetLink = ({isExpired}) => {
    const handleClick = async () => {

    };

    return (
        <div>
            <button className="battlenet-link-button" aria-label="Battlenet Link Account">
                <a onClick={handleClick} href='http://localhost:3001/battlenet'>{isExpired ? 'Refresh Profile' : 'Link Battle.net Account'}</a>
            </button>
        </div>
    );
};

export default BattleNetLink;