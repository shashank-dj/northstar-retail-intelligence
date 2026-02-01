import { useState } from "react"
import FinancialSummary from "../components/FinancialSummary"
import RentSensitivity from "../components/RentSensitivity"
import RevenueDrivers from "../components/RevenueDrivers"
import ExportButtons from "../components/ExportButtons"
import {
  calculateRevenue,
  calculateFinancials,
} from "../utils/financialModel"

export default function Financials({ area }) {
  const [category, setCategory] = useState("beauty")
  const [rent, setRent] = useState(150000)
  const [investment, setInvestment] = useState(1500000)

  // Correlation rule example
  const correlationUplift =
    area.zudioNearby && category === "beauty" ? 0.23 : 0

  const { baseRevenue, adjustedRevenue } = calculateRevenue({
    population: area.population,
    avg_income: area.avg_income,
    retailScore: area.retailScore,
    category,
    correlationUplift,
  })

  const financials = calculateFinancials({
    revenue: adjustedRevenue,
    rent,
    initialInvestment: investment,
  })

  return (
    <div className="max-w-6xl mx-auto mt-12 space-y-10">
      <h2 className="text-3xl font-bold">Financial Model</h2>

      {/* CATEGORY SELECT */}
      <div className="flex gap-4">
        <select
          className="bg-gray-900 p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="beauty">Beauty</option>
          <option value="qsr">QSR</option>
          <option value="apparel">Apparel</option>
          <option value="grocery">Grocery</option>
        </select>
      </div>

      <FinancialSummary
        revenue={adjustedRevenue}
        financials={financials}
      />

      {/* SLIDERS */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <h3 className="font-semibold mb-4">Cost Assumptions</h3>

        <label>Monthly Rent: ₹{(rent / 1000).toFixed(0)}K</label>
        <input
          type="range"
          min="80000"
          max="300000"
          step="10000"
          value={rent}
          onChange={(e) => setRent(Number(e.target.value))}
          className="w-full"
        />

        <label className="mt-4 block">
          Initial Investment: ₹{(investment / 100000).toFixed(1)}L
        </label>
        <input
          type="range"
          min="500000"
          max="5000000"
          step="100000"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <RentSensitivity
        revenue={adjustedRevenue}
        investment={investment}
      />

      <RevenueDrivers area={area} category={category} />

      <ExportButtons
        area={area}
        financials={financials}
        revenue={adjustedRevenue}
      />
    </div>
  )
}
