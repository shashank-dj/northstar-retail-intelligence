export function calculateRetailScore(area) {
  const footfallScore = Math.min(area.footfall / 1500, 30)
  const incomeScore = Math.min(area.avg_income / 60000, 25)
  const retailIndexScore = (area.retail_index / 100) * 25
  const competitionPenalty = Math.min(area.competitors * 0.4, 20)

  const rawScore =
    footfallScore +
    incomeScore +
    retailIndexScore -
    competitionPenalty

  return Math.max(0, Math.min(100, Math.round(rawScore)))
}

export function getVerdict(score) {
  if (score >= 80) return { label: "High Potential", color: "green" }
  if (score >= 55) return { label: "Moderate Potential", color: "yellow" }
  return { label: "High Risk", color: "red" }
}
