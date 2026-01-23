import AreaOverview from "./AreaOverview"
import RetailScore from "./RetailScore"

export default function ResultCard({ area }) {
  if (!area) return null

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <RetailScore score={area.retailScore} />
      <AreaOverview area={area} />
    </div>
  )
}
