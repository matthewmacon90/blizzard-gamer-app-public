import GroupRanking from "./GroupRanking";
const LeaderBoardCard = ({ dungeons }) => {
    return (
        <div className="LeaderBoardCard-container">
            {dungeons.map((dungeon , idx) => (
                <div key={dungeon.dungeonId} className="LeaderBoardCard">
                    <h3>{dungeon.dungeonName}</h3>
                    <GroupRanking groups={dungeon.leadingGroups} />
                </div>
            ))}
        </div>
    );
};

export default LeaderBoardCard;