const AnalysisMetaInfo = ({ meta }) => {
  return (
    <div className="text-xs text-gray-400 border-b border-gray-700 pb-2">
      <p>Region: {meta.region?.state || "N/A"}</p>
      <p>Classes: {meta.classes?.join(", ") || "N/A"}</p>
      <p>Source: {meta.source}</p>
      <p>Time: {new Date(meta.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default AnalysisMetaInfo;
