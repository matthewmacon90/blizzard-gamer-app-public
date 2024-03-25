const GroupRanking = ({groups}) => {
    return (
        <>
            {groups.map((group, idx) => (
                idx < 5 &&
                <div key={idx} className="keystone-group-table">
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
                            {group.members.map((member, idx) => (
                                <tr key={idx}>
                                    <td>{group.ranking}</td>
                                    <td>{member.profile.name}</td>
                                    <td>{member.profile.realm.slug}</td>
                                    <td>{group.keystone_level}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};

export default GroupRanking;