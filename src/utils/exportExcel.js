
import * as XLSX from "xlsx"

export function exportFinancialExcel(area, revenue, financials) {
  const data = [
    ["Metric", "Value"],
    ["Location", `${area.area}, ${area.city}`],
    ["Monthly Revenue", revenue],
    ["EBITDA", financials.ebitda],
    ["Payback (months)", financials.paybackMonths],
  ]

  const worksheet = XLSX.utils.aoa_to_sheet(data)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Financial Model"
  )

  XLSX.writeFile(workbook, "northstar-financial-model.xlsx")
}
