const HistoryBadge = ({ source }) => {
  return (
    <span
      className={`text-xs px-2 py-0.5 border ${
        source === "cached"
          ? "border-blue-500 text-blue-400"
          : "border-green-500 text-green-400"
      }`}
    >
      {source}
    </span>
  );
};

export default HistoryBadge;
