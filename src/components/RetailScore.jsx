import { getVerdict } from "../utils/scoreCalculator"

export default function RetailScore({ score }) {
  const verdict = getVerdict(score)

  const colorMap = {
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 mt-6 text-center">
      <p className="text-gray-400">Retail Potential Score</p>
      <p className={`text-5xl font-bold mt-2 ${colorMap[verdict.color]}`}>
        {score}
      </p>
      <p className="mt-2 text-lg">{verdict.label}</p>
    </div>
  )
}
