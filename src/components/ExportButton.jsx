import { exportOrdersToCSV } from "../utils/exportCsv";

const ExportButton = ({ orders }) => {
  return (
    <button onClick={() => exportOrdersToCSV(orders)} className="btn btn-ghost">
      <span className="u-mono" style={{ fontSize: 13 }}>↓</span>
      Export CSV
    </button>
  );
};

export default ExportButton;
