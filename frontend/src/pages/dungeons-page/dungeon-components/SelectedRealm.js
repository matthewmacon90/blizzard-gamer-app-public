import { useState, useEffect } from "react";
import Api from "../../../api";

const SelectedRealm = ({fetchDungeonLeaderBoard}) => {
    const [realms, setRealms] = useState([]);
    const [selectedRealm, setSelectedRealm] = useState('1136');

    useEffect(() => {
        async function fetchRealms() {
            try {
                const result = await Api.getRealms();
                setRealms(result);
            } catch (err) {
                console.log('ERROR FETCH REALMS: ', err);
            }
        };
        fetchRealms();
    }, []);

    const handleChange = (e) => {
        setSelectedRealm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchDungeonLeaderBoard(selectedRealm);
        setSelectedRealm('1136');
    };

    return (
        <div className="SelectedRealms-Container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="realms">Realms</label>
                <select id="realms" value={selectedRealm} onChange={handleChange} >
                    {realms.map((realm) => (
                        <option key={realm.realm_id} value={realm.realm_id}>
                            {realm.realm_name}
                        </option>
                    )
                    )}
                </select>
                <button type="submit">Get Leaderboard</button>
            </form>
        </div>
    )
};

export default SelectedRealm;