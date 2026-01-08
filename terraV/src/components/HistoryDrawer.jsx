import { useState } from "react";
import HistoryList from "./HistoryList";

const HistoryDrawer = ({ history, onReload }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-16 left-4 z-20">
      <button
        onClick={() => setOpen(!open)}
        className="bg-black border border-gray-700 px-3 py-1 text-sm"
      >
        {open ? "Close History" : "History"}
      </button>

      {open && (
        <div className="mt-2 w-80 bg-black border border-gray-700 p-3 max-h-96 overflow-y-auto">
          <HistoryList history={history} onReload={onReload} />
        </div>
      )}
    </div>
  );
};

export default HistoryDrawer;
