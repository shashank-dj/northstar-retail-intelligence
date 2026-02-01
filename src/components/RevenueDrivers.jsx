export default function RevenueDrivers({ area, category }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h3 className="font-semibold mb-4">Why This Location Works</h3>

      <ul className="space-y-2 text-sm">
        <li>+ High population density (+18%)</li>
        <li>+ Strong income profile (+22%)</li>
        {area.zudioNearby && category === "beauty" && (
          <li>+ Zudio within 500m (+23%)</li>
        )}
        <li>- Rent above city median (−9%)</li>
      </ul>
    </div>
  )
}
