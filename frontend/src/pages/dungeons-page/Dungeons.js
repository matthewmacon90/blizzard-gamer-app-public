import Api from '../../api';

const Dungeons = () => {
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
            <button onClick={fetchDungeons}>Get Dungeons</button>
        </div>
    )
};

export default Dungeons;