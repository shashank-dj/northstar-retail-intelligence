export function recommendLocations(areas, industry) {
  const industryWeights = {
    QSR: {
      footfall: 0.4,
      income: 0.15,
      population: 0.1,
      retail_index: 0.15,
      competition: -0.2,
    },
    Grocery: {
      footfall: 0.2,
      income: 0.1,
      population: 0.4,
      retail_index: 0.1,
      competition: -0.2,
    },
    Fashion: {
      footfall: 0.25,
      income: 0.35,
      population: 0.1,
      retail_index: 0.2,
      competition: -0.2,
    },
  }

  const w = industryWeights[industry]

  return areas
    .map((a) => {
      const score =
        w.footfall * (a.footfall / 150000) * 100 +
        w.income * (a.avg_income / 2000000) * 100 +
        w.population * (a.population / 500000) * 100 +
        w.retail_index * a.retail_index -
        Math.abs(w.competition) * a.competitors

      return {
        ...a,
        recommenderScore: Math.round(Math.max(0, Math.min(100, score))),
        reason: buildReason(a, industry),
      }
    })
    .sort((a, b) => b.recommenderScore - a.recommenderScore)
}

function buildReason(area, industry) {
  if (industry === "QSR") {
    return "High footfall and strong retail activity support quick-service demand."
  }
  if (industry === "Grocery") {
    return "Dense residential population supports frequent daily purchases."
  }
  if (industry === "Fashion") {
    return "Higher income households and retail clustering favor discretionary spending."
  }
  return ""
}
