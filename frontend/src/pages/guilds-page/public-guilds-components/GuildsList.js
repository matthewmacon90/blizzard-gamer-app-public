const GuildsList = ({ guilds }) => {
    return (
        <div>
            <h2>Current Guilds</h2>
            {guilds && guilds.map((guild, i) => (
                <div key={i}>
                    <h3>{guild.guild_name}</h3>
                    <p>{guild.guild_faction}</p>
                </div>
            ))}
        </div>
    );
};

export default GuildsList;