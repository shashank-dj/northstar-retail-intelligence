import { useState } from "react"
import SearchBar from "../components/SearchBar"
import ResultCard from "../components/ResultCard"
import { useNavigate } from "react-router-dom"

export default function Analyze() {
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const handleSearch = async (query) => {
    const res = await fetch("/data/northstar_area_data.csv")
    const text = await res.text()

    const rows = text.split("\n").slice(1)
    const data = rows.map((row) => {
      const [
        pincode,
        area,
        city,
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
        population: Number(population),
        avg_income: Number(avg_income),
        footfall: Number(footfall),
        competitors: Number(competitors),
        retail_index: Number(retail_index),
        avg_rent: Number(avg_rent),
      }
    })

    const match = data.find(
      (d) =>
        d.pincode === query ||
        d.area.toLowerCase().includes(query.toLowerCase())
    )

    if (match) setResult(match)
    else alert("Location not found in demo data")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Northstar
        </h1>
        <button className="bg-white text-black px-5 py-2 rounded-lg">
          Sign In
        </button>
      </nav>

      {/* Analyze Section */}
      <section className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-4xl font-bold">
          Analyze a Retail Location
        </h2>

        <p className="text-gray-400 mt-4">
          Enter a pincode or area name to see retail potential.
        </p>

        <div className="mt-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {result && <ResultCard area={result} />}
      </section>
    </div>
  )
}
