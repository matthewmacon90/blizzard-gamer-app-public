const BattleNetLink = () => {
    return (
        <div>
            <button onClick={fetch} className="battlenet-link-button" aria-label="Battlenet Link Account">
                <a href='http://localhost:3001/battlenet'>Link Battle.net Account</a>
            </button>
        </div>
    );
};

export default BattleNetLink;