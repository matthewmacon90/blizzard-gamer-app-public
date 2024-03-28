import Api from "../../api";
import GuildsList from "./public-guilds-components/GuildsList";
import GuildSelect from "./public-guilds-components/GuildSelect";

const PublicGuilds = () => {
    const selectGuilds = async (realm) => {
        try {
            const result = await Api.getGuilds(realm);
            console.log('result frontend: ', result);
        } catch (err) {
        }
    };
    return (
        <div>
            <h1>Guilds</h1>
            <GuildSelect selectGuilds={selectGuilds} />
            <GuildsList />
        </div>
    );
};

export default PublicGuilds;
