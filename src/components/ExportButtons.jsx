import { exportFinancialPdf } from "../utils/exportPdf"
import { exportFinancialExcel } from "../utils/exportExcel"

export default function ExportButtons({ area, revenue, financials }) {
  return (
    <div className="flex gap-4">
      <button
        className="bg-blue-600 px-4 py-2 rounded"
        onClick={() =>
          exportFinancialPdf(area, revenue, financials)
        }
      >
        Export PDF
      </button>

      <button
        className="bg-green-600 px-4 py-2 rounded"
        onClick={() =>
          exportFinancialExcel(area, revenue, financials)
        }
      >
        Export Excel
      </button>
    </div>
  )
}
