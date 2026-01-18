import { getCategoryRecommendations } from "../utils/categoryRecommendation"

export default function CategoryRecommendation({ area }) {
  const categories = getCategoryRecommendations(area)

  const colorMap = {
    "Highly Suitable": "text-green-400",
    "Moderately Suitable": "text-yellow-400",
    "Low Suitability": "text-red-400",
  }

  return (
    <div className="mt-16 bg-gray-900 rounded-xl p-8 text-left">
      <h3 className="text-2xl font-bold mb-4">
        Recommended Retail Categories
      </h3>

      <p className="text-gray-400 mb-6">
        Category suitability is calculated using footfall, income levels,
        population density, rent sensitivity, and competition intensity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((c, i) => (
          <div
            key={i}
            className="border border-gray-800 rounded-lg p-5"
          >
            <h4 className="text-xl font-semibold mb-1">{c.name}</h4>

            <p className={`text-sm font-medium ${colorMap[c.suitability]}`}>
              {c.suitability}
            </p>

            <ul className="mt-3 space-y-1 text-sm text-gray-400">
              {c.reasons.length > 0 ? (
                c.reasons.map((r, idx) => (
                  <li key={idx}>• {r}</li>
                ))
              ) : (
                <li>• Limited supporting signals for this category</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
