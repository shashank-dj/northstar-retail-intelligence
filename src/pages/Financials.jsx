import { useLocation, Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import FinancialSummary from "../components/FinancialSummary"
import RentSensitivity from "../components/RentSensitivity"
import RevenueDrivers from "../components/RevenueDrivers"
import ExportButtons from "../components/ExportButtons"
import {
  calculateRevenue,
  calculateFinancials,
} from "../utils/financialModel"

export default function Financials() {
  const location = useLocation()
  const navigate = useNavigate()
  const area = location.state?.area

  // 🔒 Guard: no data → go back to Analyze
  if (!area) {
    return <Navigate to="/analyze" replace />
  }

  const [category, setCategory] = useState("beauty")
  const [rent, setRent] = useState(150000)
  const [investment, setInvestment] = useState(1500000)

  // Example correlation rule
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
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Northstar Retail Intelligence
        </h1>
        <button className="bg-white text-black px-5 py-2 rounded-lg">
          Sign In
        </button>
      </nav>

      {/* Page Content */}
      <div className="px-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto pt-8">
          <h1 className="text-3xl font-bold">
            Financial Model – {area.area}, {area.city}
          </h1>
          <p className="text-gray-400 mt-2">
            Revenue, payback and rent sensitivity analysis
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-10 space-y-10">
          
          {/* Category selector */}
          <div className="bg-gray-900 p-6 rounded-xl">
            <label className="block mb-2 text-sm text-gray-400">
              Retail Category
            </label>
            <select
              className="bg-gray-800 px-4 py-2 rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="beauty">Beauty</option>
              <option value="qsr">QSR</option>
              <option value="apparel">Apparel</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>

          {/* Financial Summary */}
          <FinancialSummary
            revenue={adjustedRevenue}
            financials={financials}
          />

          {/* Cost sliders */}
          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Cost Assumptions</h3>

            <label className="block text-sm mb-1">
              Monthly Rent: ₹{(rent / 1000).toFixed(0)}K
            </label>
            <input
              type="range"
              min="80000"
              max="300000"
              step="10000"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              className="w-full"
            />

            <label className="block text-sm mt-6 mb-1">
              Initial Investment: ₹{(investment / 100000).toFixed(1)}L
            </label>
            <input
              type="range"
              min="500000"
              max="5000000"
              step="100000"
              value={investment}
              onChange={(e) =>
                setInvestment(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* Rent Sensitivity */}
          <RentSensitivity
            revenue={adjustedRevenue}
            rent={rent}
            investment={investment}
          />

          {/* Revenue Drivers */}
          <RevenueDrivers area={area} category={category} />

          {/* Export */}
          <ExportButtons
            area={area}
            revenue={adjustedRevenue}
            financials={financials}
          />
        </div>
      </div>
    </div>
  )
}
