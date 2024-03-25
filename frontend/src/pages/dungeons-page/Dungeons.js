import {useState, useEffect} from 'react';
import Api from '../../api';
import SelectedRealm from './dungeon-components/SelectedRealm';
import LeaderBoard from './dungeon-components/LeaderBoard';
import './LeaderBoardStyles.css';
//Default Realm: Area 52 id: 1566 connected_id: 3676 slug: area-52

const Dungeons = () => {
    const [dungeons, setDungeons] = useState([]);

    async function fetchDungeonLeaderBoard(realmId) {
        try {
            console.log('REALM ID FETCH: ', realmId);
            const result = await Api.getDungeonByRealmId(realmId);
            setDungeons(result);
            console.log('RESULT FRONT END DUNGEONS: ', result);
        } catch (err) {
            console.log('ERROR FETCH DUNGEONS: ', err);
        }
    };


    return (
        <div className="Dungeons-Container">
            <h1>Dungeons</h1>
            <SelectedRealm fetchDungeonLeaderBoard={fetchDungeonLeaderBoard} />
            <LeaderBoard dungeons={dungeons} />
        </div>
    )
};

export default Dungeons;