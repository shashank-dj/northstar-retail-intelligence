import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import ResultCard from "../components/ResultCard"
import AnalysisExplanation from "../components/AnalysisExplanation"
import { calculateRetailScore } from "../utils/scoreCalculator"

export default function Analyze() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const datasetRef = useRef(null)

  const parseCSVRow = (row) => {
    const parts = row.split(",").map(p => p.trim())
    if (parts.length < 11) return null

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
    ] = parts

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
  }

  const loadDataset = async () => {
    if (datasetRef.current) return datasetRef.current

    const res = await fetch("/data/northstar_area_data.csv")
    const text = await res.text()
    const rows = text.split("\n").slice(1)

    const dataset = rows
      .map((row) => row.trim())
      .filter(Boolean)
      .map(parseCSVRow)
      .filter(Boolean)

    datasetRef.current = dataset
    return dataset
  }

  const handleSearch = async (query) => {
    try {
      setLoading(true)

      const dataset = await loadDataset()
      const normalizedQuery = query.toLowerCase().trim()

      const match = dataset.find(
        (d) =>
          d.pincode === query ||
          d.area.toLowerCase().includes(normalizedQuery)
      )

      if (!match) {
        alert("Location not found in demo Bangalore dataset")
        setLoading(false)
        return
      }

      const scoreResult = calculateRetailScore(match, dataset)

      setResult({
        ...match,
        retailScore: scoreResult.score,
        breakdown: scoreResult.breakdown,
      })
    } catch (err) {
      console.error("Failed to load data", err)
      alert("Failed to analyze location")
    } finally {
      setLoading(false)
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
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results */}
        {result && (
          <>
            <ResultCard area={result} />
            <AnalysisExplanation breakdown={result.breakdown} />
          </>
        )}
      </section>
    </div>
  )
}
