const GuildSelect = ({selectGuilds}) => {
    const handleClick = (e) => {
        e.preventDefault();
        const guilds = document.getElementById('guilds').value;
        selectGuilds(guilds);
    };
    return (
        <div>
            <form>
                <label htmlFor="guilds">Guilds:</label>
                <select name="guilds" id="guilds">
                    <option value="area-52">Area-52</option>
                    <option value="guild2">Guild 2</option>
                    <option value="guild3">Guild 3</option>
                </select>
                <button onClick={handleClick} type="submit">Select</button>
            </form>
        </div>
    );
};

export default GuildSelect;
