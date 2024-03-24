import LeaderBoardCard from "./LeaderBoardCard";

const LeaderBoard = ({ dungeons }) => {
    console.log('DUNGEONS LeaderBoard: ', dungeons);
    return (
        <div className="LeaderBoard-container">
            <LeaderBoardCard dungeons={dungeons} />
        </div>
    );
};

export default LeaderBoard;