import LeaderBoardCard from "./LeaderBoardCard";

const LeaderBoard = ({ dungeons }) => {
    return (
        <div className="LeaderBoard-container">
            <LeaderBoardCard dungeons={dungeons} />
        </div>
    );
};

export default LeaderBoard;