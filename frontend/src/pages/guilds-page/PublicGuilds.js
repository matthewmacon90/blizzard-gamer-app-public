import {useState} from "react";
import Api from "../../api";
import GuildsList from "./public-guilds-components/GuildsList";
import GuildSelect from "./public-guilds-components/GuildSelect";


const PublicGuilds = () => {
    const [guilds, setGuilds] = useState(null);
    const selectGuilds = async (realm) => {
        try {
            const result = await Api.getGuilds(realm);
            setGuilds(result);
        } catch (err) {
        }
    };
    return (
        <div>
            <h1>Guilds</h1>
            <GuildSelect selectGuilds={selectGuilds} />
            <GuildsList guilds={guilds} />
        </div>
    );
};

export default PublicGuilds;
