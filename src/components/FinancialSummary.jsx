export default function FinancialSummary({ revenue, financials }) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-900 p-6 rounded-xl">
      <Stat label="Monthly Revenue" value={`₹${(revenue / 100000).toFixed(2)}L`} />
      <Stat label="EBITDA" value={`₹${(financials.ebitda / 100000).toFixed(2)}L`} />
      <Stat
        label="Payback"
        value={`${financials.paybackMonths.toFixed(1)} months`}
      />
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}
