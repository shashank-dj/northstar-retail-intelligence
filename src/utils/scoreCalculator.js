export function calculateRetailScore(area, dataset, weights = null) {
  const minMax = (key) => {
    const values = dataset.map(d => d[key])
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    }
  }

  const norm = (value, min, max) =>
    max === min ? 50 : ((value - min) / (max - min)) * 100

  const ranges = {
    population: minMax("population"),
    avg_income: minMax("avg_income"),
    footfall: minMax("footfall"),
    competitors: minMax("competitors"),
    retail_index: minMax("retail_index"),
    avg_rent: minMax("avg_rent"),
  }

  const popScore = norm(area.population, ranges.population.min, ranges.population.max)
  const incomeScore = norm(area.avg_income, ranges.avg_income.min, ranges.avg_income.max)
  const footfallScore = norm(area.footfall, ranges.footfall.min, ranges.footfall.max)
  const retailScore = norm(area.retail_index, ranges.retail_index.min, ranges.retail_index.max)
  const compPenalty = norm(area.competitors, ranges.competitors.min, ranges.competitors.max)
  const rentPenalty = norm(area.avg_rent, ranges.avg_rent.min, ranges.avg_rent.max)

  // Default weights (used until slider UI is added)
  const defaultWeights = {
    population: 15,
    avg_income: 20,
    footfall: 25,
    retail_index: 20,
    competitors: 10,
    avg_rent: 10,
  }

  const w = weights || defaultWeights

  const totalWeight =
    w.population +
    w.avg_income +
    w.footfall +
    w.retail_index +
    w.competitors +
    w.avg_rent

  const W = {
    population: w.population / totalWeight,
    avg_income: w.avg_income / totalWeight,
    footfall: w.footfall / totalWeight,
    retail_index: w.retail_index / totalWeight,
    competitors: w.competitors / totalWeight,
    avg_rent: w.avg_rent / totalWeight,
  }

  const rawScore =
    W.population * popScore +
    W.avg_income * incomeScore +
    W.footfall * footfallScore +
    W.retail_index * retailScore -
    W.competitors * compPenalty -
    W.avg_rent * rentPenalty

  return Math.max(0, Math.min(100, Math.round(rawScore)))
}

export function getVerdict(score) {
  if (score >= 80) return { label: "High Potential", color: "green" }
  if (score >= 55) return { label: "Moderate Potential", color: "yellow" }
  return { label: "High Risk", color: "red" }
}
