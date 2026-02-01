export default function RentSensitivity({ revenue, rent, investment }) {
  // Cost assumptions (can later be category-driven)
  const variableCostRatio = 0.35
  const fixedCostRatio = 0.25

  const calculateEBITDA = (r) => {
    const variableCosts = revenue * variableCostRatio
    const fixedCosts = revenue * fixedCostRatio
    return revenue - variableCosts - fixedCosts - r
  }

  const calculatePayback = (ebitda) => {
    if (ebitda <= 0) return null
    return investment / ebitda
  }

  // 🔑 Sensitivity derived from slider rent (single source of truth)
  const scenarios = [
    { label: "Low Rent (−20%)", rent: Math.round(rent * 0.8) },
    { label: "Base Case", rent: rent },
    { label: "High Rent (+20%)", rent: Math.round(rent * 1.2) },
    { label: "Stress Case (+35%)", rent: Math.round(rent * 1.35) },
  ]

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4">
        Rent Sensitivity Analysis
      </h3>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800">
            <th className="py-3 text-left">Scenario</th>
            <th className="py-3 text-left">Monthly Rent</th>
            <th className="py-3 text-left">Monthly EBITDA</th>
            <th className="py-3 text-left">Payback</th>
            <th className="py-3 text-left">Verdict</th>
          </tr>
        </thead>

        <tbody>
          {scenarios.map((s, idx) => {
            const ebitda = calculateEBITDA(s.rent)
            const payback = calculatePayback(ebitda)

            return (
              <tr
                key={idx}
                className="border-b border-gray-800 last:border-none"
              >
                <td className="py-4 font-medium">
                  {s.label}
                </td>

                <td className="py-4">
                  ₹{(s.rent / 1000).toFixed(0)}K
                </td>

                <td
                  className={`py-4 font-medium ${
                    ebitda >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ₹{(ebitda / 100000).toFixed(2)}L
                </td>

                <td className="py-4">
                  {payback ? (
                    `${payback.toFixed(1)} months`
                  ) : (
                    <span className="text-red-400">
                      Not recoverable
                    </span>
                  )}
                </td>

                <td className="py-4">
                  {ebitda > 0 ? (
                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">
                      Viable
                    </span>
                  ) : (
                    <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs">
                      High Risk
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <p className="text-xs text-gray-500 mt-4">
        * Sensitivity scenarios are automatically generated from the
        selected rent value. Payback is calculated using monthly EBITDA.
      </p>
    </div>
  )
}
