export default function AreaOverview({ area }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 mt-8">
      <h3 className="text-xl font-semibold mb-4">
        {area.area}, {area.city}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <Stat label="Population" value={area.population.toLocaleString()} />
        <Stat label="Avg Income" value={`₹${(area.avg_income / 100000).toFixed(1)}L`} />
        <Stat label="Daily Footfall" value={area.footfall.toLocaleString()} />
        <Stat label="Competitors" value={area.competitors} />
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}
