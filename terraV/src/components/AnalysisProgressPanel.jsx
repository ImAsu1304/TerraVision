import ProgressTimeLine from "./ProgressTimeLine";
import TileProgressIndicator from "./TileProgressIndicator";
import CancelAnalysisButton from "./CancelAnalysisButton";

const AnalysisProgressPanel = ({status, tilesDone, totalTiles, onCancel}) => {
    return(
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black border border-gray-700 p-4 w-96">
        <ProgressTimeLine status={status} />
        <TileProgressIndicator
        tilesDone={tilesDone}
        totalTiles={totalTiles}
        />
        {status === "running" && (
            <CancelAnalysisButton onCancel={onCancel} 
            />
        )}
        </div>
    );
};

export default AnalysisProgressPanel;