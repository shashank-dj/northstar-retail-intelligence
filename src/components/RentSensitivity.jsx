import { rentSensitivity } from "../utils/financialModel"

export default function RentSensitivity({ revenue, investment }) {
  const rows = rentSensitivity({
    revenue,
    initialInvestment: investment,
  })

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h3 className="font-semibold mb-4">Rent Sensitivity</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th>Rent</th>
            <th>EBITDA</th>
            <th>Payback</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.rent}>
              <td>₹{(r.rent / 1000).toFixed(0)}K</td>
              <td>₹{(r.ebitda / 100000).toFixed(2)}L</td>
              <td>{r.paybackMonths.toFixed(1)} mo</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
