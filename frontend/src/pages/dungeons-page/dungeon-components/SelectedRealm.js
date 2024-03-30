import { useState, useEffect } from "react";
import Api from "../../../api";

const SelectedRealm = ({fetchDungeonLeaderBoard}) => {
    const [realms, setRealms] = useState([]);
    const [selectedRealm, setSelectedRealm] = useState('1136');
    const [currentRealm, setCurrentRealm] = useState('Aegwynn');

    useEffect(() => {
        async function fetchRealms() {
            try {
                const result = await Api.getRealms();
                setRealms(result);
            } catch (err) {

            }
        };
        fetchRealms();
    }, []);

    const handleChange = (e) => {
        const realm = realms.find((realm) => realm.realm_id === Number(e.target.value));
        setCurrentRealm(realm.realm_name);
        setSelectedRealm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const realm = realms.find((realm) => realm.realm_id === Number(selectedRealm));
        setCurrentRealm('Aegwynn');
        await fetchDungeonLeaderBoard(selectedRealm);
        setSelectedRealm();
    };

    return (
        <div className="SelectedRealms-Container">
            <form className="SelectedRealms-selectForm" onSubmit={handleSubmit}>
                <label className="SelectedRealms-label" htmlFor="realms">Leaderboard Realms</label>
                <select className="SelectedRealms-select-input" id="realms" value={selectedRealm} onChange={handleChange} >
                    {realms.map((realm) => (
                        <option key={realm.realm_id} value={realm.realm_id}>
                            {realm.realm_name}
                        </option>
                    )
                    )}
                </select>
                <button className="SelectedRealms-btn" type="submit">Get Leaderboard</button>
            </form>
            <h2 className="SelectedRealms-heading">Current Selected Realm: {currentRealm}</h2>
        </div>
    )
};

export default SelectedRealm;