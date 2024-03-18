import { useState, useEffect } from "react";
import Api from "../../../api";

const FilteredDungeons = ({ dungeons }) => {
    const initialState = {
        realmId: '',
        realmSlug: '',
        realmConnectedId: ''
    }
    const [realms, setRealms] = useState([]);
    const [selectedRealm, setSelectedRealm] = useState(initialState);

    useEffect(() => {
        async function fetchRealms() {
            try {
                const result = await Api.getRealms();
                setRealms(result);
                console.log('RESULT FRONT END REALMS: ', result);
            } catch (err) {
                console.log('ERROR FETCH REALMS: ', err);
            }
        };
        fetchRealms();
    }, []);

    const handleChange = (e) => {
        console.log('E.TARGET: ', e.target)
        const {name, value } = e.target;
        const { realmId, realmSlug, realmConnectedId } = value;
        console.log('VALUE: ', value)
        const realmData = {[name]: value};
        setSelectedRealm(realmData)
        console.log('SELECTED REALM: ', selectedRealm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SELECTED REALM: ', selectedRealm);
    };

    return (
        <div className="FilteredDungeons-Container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="realms">Realms</label>
                <select id="realms" name={selectedRealm} value={selectedRealm} onChange={handleChange} >
                    {realms.map((realm) => (
                        <option key={realm.realm_id} value={{ realmId: realm.realm_id, realmSlug: realm.realm_slug, realmConntectedId: realm.connected_realm_id }}>
                            {realm.realm_name}
                        </option>
                    )
                    )}
                </select>
                <button type="submit">Get Dungeons</button>
            </form>
        </div>
    )
};

export default FilteredDungeons;