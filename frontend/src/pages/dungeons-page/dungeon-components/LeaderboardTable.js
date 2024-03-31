import Members from "./Members";

const LeaderboardTable = ({groups}) => {
    console.log('groups: ', groups); 
    // const {leadingGroups} = groups;
    // const dungeonGroups = leadingGroups;
    return (
        <>
            {groups.map((group, idx) => (
                idx < 5 && (
                    <tr key={idx}>
                        <td>{group.ranking}</td>
                        <td>{group.keystone_level}</td>
                        <Members key={group.ranking} members={group.members} />
                    </tr>
                )
            ))}
        </>
    );
};

export default LeaderboardTable;