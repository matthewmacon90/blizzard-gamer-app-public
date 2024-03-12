import Api from "../../api";
import GuildsList from "./public-guilds-components/GuildsList";
import GuildSelect from "./public-guilds-components/GuildSelect";

const Guilds = () => {

    const selectGuilds = async (realm) => {
        try {
            const result = await Api.getGuilds(realm);
            console.log('SELECTED GUILD: ', realm);
            console.log('RESULT FRONT END: ', result);
        } catch (err) {
            console.error('ERROR SELECTING GUILD: ', err);
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

export default Guilds;