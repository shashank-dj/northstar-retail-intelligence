import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import ResultCard from "../components/ResultCard"
import AnalysisExplanation from "../components/AnalysisExplanation"

export default function Analyze() {
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const handleSearch = async (query) => {
    try {
      const res = await fetch("/data/northstar_area_data.csv")
      const text = await res.text()

      const rows = text.split("\n").slice(1)

      const data = rows
        .map((row) => row.trim())
        .filter(Boolean)
        .map((row) => {
          const [
            pincode,
            area,
            city,
            lat,
            lng,
            population,
            avg_income,
            footfall,
            competitors,
            retail_index,
            avg_rent,
          ] = row.split(",")

          return {
            pincode,
            area,
            city,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            population: Number(population),
            avg_income: Number(avg_income),
            footfall: Number(footfall),
            competitors: Number(competitors),
            retail_index: Number(retail_index),
            avg_rent: Number(avg_rent),
          }
        })

      const normalizedQuery = query.toLowerCase()

      const match = data.find(
        (d) =>
          d.pincode === query ||
          d.area.toLowerCase().includes(normalizedQuery)
      )

      if (match) {
        setResult(match)
      } else {
        alert("Location not found in demo Bangalore dataset")
      }
    } catch (err) {
      console.error("Failed to load data", err)
      alert("Failed to analyze location")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4">
      
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

      {/* Analyze Section */}
      <section className="max-w-5xl mx-auto mt-20 text-center">
        <h2 className="text-4xl font-bold">
          Analyze a Retail Location
        </h2>

        <p className="text-gray-400 mt-4">
          Enter a Bangalore pincode or area name to evaluate retail feasibility.
        </p>

        <div className="mt-8 max-w-xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results */}
        {result && (
          <>
            <ResultCard area={result} />
            <AnalysisExplanation />
          </>
        )}
      </section>
    </div>
  )
}
