export default function WeightSliders({ weights, onChange, onReset }) {
  const handleChange = (key, value) => {
    const newWeights = {
      ...weights,
      [key]: Number(value),
    }
    onChange(newWeights)
  }

  const total = Object.values(weights).reduce((a, b) => a + b, 0)

  const sliders = [
    { key: "population", label: "Population" },
    { key: "avg_income", label: "Avg Income" },
    { key: "footfall", label: "Footfall" },
    { key: "retail_index", label: "Retail Index" },
    { key: "competitors", label: "Competition" },
    { key: "avg_rent", label: "Rent" },
  ]

  return (
    <div className="bg-gray-900 rounded-xl p-6 mt-10">
      <h3 className="text-xl font-semibold mb-4">
        Customize Scoring Weights
      </h3>

      <div className="space-y-4">
        {sliders.map(({ key, label }) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{label}</span>
              <span className="text-gray-400">
                {weights[key]}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={weights[key]}
              onChange={(e) =>
                handleChange(key, e.target.value)
              }
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-400">
          Total Weight: {total}%
        </p>

        <button
          onClick={onReset}
          className="text-sm text-blue-400 hover:underline"
        >
          Reset to Default
        </button>
      </div>

      {total !== 100 && (
        <p className="text-xs text-yellow-400 mt-2">
          ⚠ Weights don’t add up to 100%. They will be normalized automatically.
        </p>
      )}
    </div>
  )
}
