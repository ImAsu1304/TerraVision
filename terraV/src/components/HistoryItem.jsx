import HistoryReloadButton from "./HistoryReloadButton";
import HistoryBadge from "./HistoryBadge";

const HistoryItem = ({ item, onReload }) => {
  return (
    <div className="border border-gray-700 p-2 text-sm">
      <div className="flex justify-between items-center">
        <span className="text-gray-300">{item.region.state}</span>
        <HistoryBadge source={item.source} />
      </div>

      <p className="text-xs text-gray-500">
        {new Date(item.timestamp).toLocaleString()}
      </p>

      <p className="text-xs text-gray-400">
        {item.classes.join(", ")}
      </p>

      <HistoryReloadButton onClick={() => onReload(item)} />
    </div>
  );
};

export default HistoryItem;
