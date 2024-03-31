import LeaderboardTable from "./LeaderboardTable";
const LeaderBoardCard = ({ dungeons }) => {
    console.log('dungeons: ', dungeons);
    // const dungeonData = dungeons.dungeonData;
    return (
        <div className="LeaderBoardCard-container">
            {dungeons ? dungeons.map((dungeon) => (
                <div key={dungeon.dungeonId} className="LeaderBoardCard">
                    <h3>{dungeon.dungeonName}</h3>
                    <div key={dungeon.leaderboardId} className="keystone-group-table">
                        <table className="keystone-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Keystone Level</th>
                                    <th>Character</th>
                                    <th>Realm</th>
                                </tr>
                            </thead>
                            <tbody>
                                <LeaderboardTable groups={dungeon.leadingGroups} />
                            </tbody>
                        </table>
                    </div>
                </div>
            )) : null}
        </div>
    );
};

export default LeaderBoardCard;