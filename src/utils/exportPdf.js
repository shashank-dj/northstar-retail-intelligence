
import jsPDF from "jspdf"

export function exportFinancialPdf(area, revenue, financials) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text("Northstar Financial Report", 20, 20)

  doc.setFontSize(11)
  doc.text(`Location: ${area.area}, ${area.city}`, 20, 35)
  doc.text(
    `Monthly Revenue: ₹${(revenue / 100000).toFixed(2)} L`,
    20,
    45
  )
  doc.text(
    `EBITDA: ₹${(financials.ebitda / 100000).toFixed(2)} L`,
    20,
    55
  )
  doc.text(
    `Payback Period: ${financials.paybackMonths.toFixed(1)} months`,
    20,
    65
  )

  doc.save("northstar-financial-report.pdf")
}
