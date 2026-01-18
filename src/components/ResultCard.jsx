import AreaOverview from "./AreaOverview"
import RetailScore from "./RetailScore"
import { calculateRetailScore } from "../utils/scoreCalculator"

export default function ResultCard({ area }) {
  const score = calculateRetailScore(area)

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <RetailScore score={score} />
      <AreaOverview area={area} />
    </div>
  )
}
