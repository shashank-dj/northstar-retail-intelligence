export default function AnalysisExplanation() {
  const factors = [
    {
      title: "Footfall Intensity",
      desc: "Higher daily footfall increases visibility and walk-in demand.",
      weight: "30%",
    },
    {
      title: "Household Income",
      desc: "Higher income areas support premium pricing and repeat purchases.",
      weight: "25%",
    },
    {
      title: "Retail Attractiveness Index",
      desc: "Composite indicator of retail activity, brand presence, and demand.",
      weight: "25%",
    },
    {
      title: "Competition Density",
      desc: "Higher competition reduces opportunity due to cannibalization.",
      weight: "-20%",
    },
  ]

  return (
    <div className="mt-16 bg-gray-900 rounded-xl p-8 text-left">
      <h3 className="text-2xl font-bold mb-4">
        How This Location Was Analyzed
      </h3>

      <p className="text-gray-400 mb-6">
        Northstar evaluates each location using multiple demand, income,
        and competition signals to estimate retail feasibility.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {factors.map((f, i) => (
          <div
            key={i}
            className="border border-gray-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">{f.title}</h4>
              <span className="text-sm text-blue-400">
                Weight: {f.weight}
              </span>
            </div>
            <p className="text-sm text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-6">
        * This is a demo scoring model for MVP purposes. Final models will
        incorporate category-specific and real-time signals.
      </p>
    </div>
  )
}
