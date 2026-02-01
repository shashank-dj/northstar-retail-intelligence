import jsPDF from "jspdf"

export function exportFinancialPdf(area, revenue, financials) {
  const doc = new jsPDF()

  doc.text("Northstar Financial Report", 20, 20)
  doc.text(`Location: ${area.area}`, 20, 30)
  doc.text(`Revenue: ₹${(revenue / 100000).toFixed(2)}L`, 20, 40)
  doc.text(`EBITDA: ₹${(financials.ebitda / 100000).toFixed(2)}L`, 20, 50)
  doc.text(
    `Payback: ${financials.paybackMonths.toFixed(1)} months`,
    20,
    60
  )

  doc.save("financial-report.pdf")
}
