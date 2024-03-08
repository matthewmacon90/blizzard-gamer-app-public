import ContentHomePage from "./HomePageComponents/ContentHomePage";
import './HomePageStyles.css';

const HomePage = () => {
    return (
        <div className="HomePage-Container">
            <h1 className="HomePage-Heading">Welcome to The Sons of Thunder</h1>
            <div className="HomePage-Content">
                <ContentHomePage />
            </div>
            
        </div>
    );
};

export default HomePage;