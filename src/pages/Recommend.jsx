import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { recommendLocations } from "../utils/recommender"

export default function Recommend() {
  const [industry, setIndustry] = useState("QSR")
  const [results, setResults] = useState([])
  const navigate = useNavigate()

  const handleRecommend = async () => {
    const res = await fetch("/data/northstar_area_data.csv")
    const text = await res.text()

    const rows = text.split("\n").slice(1)
    const areas = rows
      .map((r) => r.trim())
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
          lat: Number(lat),
          lng: Number(lng),
          population: Number(population),
          avg_income: Number(avg_income),
          footfall: Number(footfall),
          competitors: Number(competitors),
          retail_index: Number(retail_index),
          avg_rent: Number(avg_rent),
        }
      })

    const ranked = recommendLocations(areas, industry)
    setResults(ranked.slice(0, 5))
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
      </nav>

      <section className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-4xl font-bold">
          Location Recommender
        </h2>

        <p className="text-gray-400 mt-4">
          Select your industry to find the best areas to open a store.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg"
          >
            <option value="QSR">QSR</option>
            <option value="Grocery">Grocery</option>
            <option value="Fashion">Fashion</option>
          </select>

          <button
            onClick={handleRecommend}
            className="bg-blue-500 px-6 py-2 rounded-lg font-semibold"
          >
            Find Best Locations
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-12 text-left">
            <h3 className="text-2xl font-bold mb-6">
              Top Recommended Areas
            </h3>

            <div className="space-y-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold">
                      {r.area}
                    </h4>
                    <span className="text-green-400 font-bold">
                      Score: {r.recommenderScore}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mt-2">
                    {r.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
