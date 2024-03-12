const BattleNetLink = ({isExpired}) => {
    return (
        <div>
            <button className="battlenet-link-button" aria-label="Battlenet Link Account">
                <a href='http://localhost:3001/battlenet'>{isExpired ? 'Refresh Profile' : 'Link Battle.net Account'}</a>
            </button>
        </div>
    );
};

export default BattleNetLink;