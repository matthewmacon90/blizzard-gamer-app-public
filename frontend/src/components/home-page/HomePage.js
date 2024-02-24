import Api from "../../api";

const HomePage = () => {
    const getTest = async () => {
        try {
            const result = await Api.getMyWow();
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <h1>Welcome to The Sons of Thunder</h1>
            <button onClick={getTest}>Get My WoW</button>
        </div>
    );
};

export default HomePage;