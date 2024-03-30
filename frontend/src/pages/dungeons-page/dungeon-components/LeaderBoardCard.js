import GroupRanking from "./GroupRanking";
const LeaderBoardCard = ({ dungeons }) => {
    const dungeonData = dungeons.dungeonData;
    return (
        <div className="LeaderBoardCard-container">
            {dungeonData ? dungeonData.map((dungeon) => (
                <div key={dungeon.dungeonId} className="LeaderBoardCard">
                    <h3>{dungeon.dungeonName}</h3>
                    <GroupRanking groups={dungeons} />
                </div>
            )) : null}
        </div>
    );
};

export default LeaderBoardCard;