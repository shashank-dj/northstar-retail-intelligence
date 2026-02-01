import { exportFinancialPdf } from "../utils/exportPdf"
import { exportFinancialExcel } from "../utils/exportExcel"

export default function ExportButtons({ area, revenue, financials }) {
  if (!area || !financials) return null

  return (
    <div className="flex gap-4 mt-6">
      <button
        className="bg-blue-600 px-4 py-2 rounded-lg"
        onClick={() =>
          exportFinancialPdf(area, revenue, financials)
        }
      >
        Export PDF
      </button>

      <button
        className="bg-green-600 px-4 py-2 rounded-lg"
        onClick={() =>
          exportFinancialExcel(area, revenue, financials)
        }
      >
        Export Excel
      </button>
    </div>
  )
}
