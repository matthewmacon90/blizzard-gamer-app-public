const LeaderBoardCard = ({ dungeons }) => {
    return (
        <div className="LeaderBoardCard-container">
            {dungeons.map((dungeon , idx) => (
                idx < 10 &&
                <div key={dungeon.dungeonId} className="LeaderBoardCard">
                    <h3>{dungeon.dungeonName}</h3>
                    <p>Current Period: {dungeon.current_period}</p>
                </div>
            ))}
        </div>
    );
};

export default LeaderBoardCard;