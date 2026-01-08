import HistoryItem from "./HistoryItem";

const HistoryList = ({ history, onReload }) => {
  if (history.length === 0) {
    return (
      <p className="text-xs text-gray-500">No past analyses</p>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((item) => (
        <HistoryItem
          key={item.id}
          item={item}
          onReload={onReload}
        />
      ))}
    </div>
  );
};

export default HistoryList;
