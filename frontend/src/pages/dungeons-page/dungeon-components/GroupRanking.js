const GroupRanking = ({groups}) => {
    console.log('groups: ', groups); 
    const groupData = groups.leaderboardData;
    return (
        <>
            {groupData.map((group, idx) => (
                idx < 10 &&
                <div key={group.leaderboardId} className="keystone-group-table">
                    <table className="keystone-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Character</th>
                                <th>Realm</th>
                                <th>Keystone Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={idx}>
                                <td>{group.groupRanking}</td>
                                <td>{group.characterName}</td>
                                <td>{group.realmName}</td>
                                <td>{group.keystoneLevel}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};

export default GroupRanking;