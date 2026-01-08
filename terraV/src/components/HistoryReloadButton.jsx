const HistoryReloadButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-2 w-full border border-gray-700 text-xs p-1 hover:bg-gray-800"
    >
      Load
    </button>
  );
};

export default HistoryReloadButton;
