import { useState } from "react"
import SearchBar from "../components/SearchBar"
import ResultCard from "../components/ResultCard"

export default function Home() {
  const [result, setResult] = useState(null)

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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">Northstar</h1>
        <button className="bg-white text-black px-5 py-2 rounded-lg">
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center mt-24 px-4">
        <h2 className="text-5xl font-extrabold">
          Decide Where to Open Your <span className="text-blue-400">Next Store</span>
        </h2>

        <p className="text-gray-400 mt-6 max-w-xl">
          Location intelligence for retail brands. Analyze demand, income,
          footfall & competition in seconds.
        </p>

        <div className="mt-10 w-full max-w-xl">
          <SearchBar onSearch={handleSearch} />
        </div>

        {result && <ResultCard area={result} />}
      </section>
    </div>
  )
}
