import WoWClassCard from "./WoWClassCard";
import './WoWHeadStyles.css';

const WoWHead = () => {
    return (
        <div className='wowhead-container'>
            <h2 className='wowhead-class-guide-heading'>Class Guides</h2>
            <p className='wowhead-class-note'>*The following links will send you to WoW Head and the respective class guides.</p>
            <div className="wowhead-class-card-container">
                <WoWClassCard />
            </div>
        </div>
    )
};

export default WoWHead;