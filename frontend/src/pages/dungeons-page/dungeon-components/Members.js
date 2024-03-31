const Members = ({ members }) => {
    return (
        <>
            {members.map((member, idx) => (
                <>
                    <td key={member.profile.name.id}>{member.profile.name}</td>
                    <td key={member.profile.name.id}>{member.profile.realm.slug}</td>
                </>

            ))}
        </>
    );
};

export default Members;