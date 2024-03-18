import Api from '../../api';
import FilteredDungeons from './dungeon-components/FilteredDungeons';
import {useState, useEffect} from 'react';
//Default Realm: Area 52 id: 1566 connected_id: 3676 slug: area-52

const Dungeons = () => {
    const [dungeons, setDungeons] = useState([]);

    async function fetchDungeons() {
        try {
            const result = await Api.getDungeons();
            console.log('RESULT FRONT END DUNGEONS: ', result);
        } catch (err) {
            console.log('ERROR FETCH DUNGEONS: ', err);
        }
    };

    return (
        <div className="Dungeons-Container">
            <h1>Dungeons</h1>
            <FilteredDungeons />
            <button onClick={fetchDungeons}>Get Dungeons</button>
        </div>
    )
};

export default Dungeons;