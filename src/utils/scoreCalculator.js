// utils/retailScore.js

function minMax(dataset, key) {
  const values = dataset.map(d => d[key]).filter(v => v !== null && v !== undefined)
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  }
}

// Normalization for "good" metrics
function normalizePositive(value, min, max) {
  if (max === min) return 50
  return ((value - min) / (max - min)) * 100
}

// Normalization for "bad" metrics (lower is better)
function normalizeNegative(value, min, max) {
  if (max === min) return 50
  return (1 - (value - min) / (max - min)) * 100
}

// Soft saturation curve (prevents insane spikes)
function saturate(score, k = 0.035) {
  return 100 * (1 - Math.exp(-k * score))
}

// Threshold penalty curve
function thresholdPenalty(value, threshold, severity = 1.5) {
  if (value <= threshold) return 0
  return Math.min(100, (value - threshold) * severity)
}

export function calculateRetailScore(area, dataset, weights = null) {
  const ranges = {
    population: minMax(dataset, "population"),
    avg_income: minMax(dataset, "avg_income"),
    footfall: minMax(dataset, "footfall"),
    competitors: minMax(dataset, "competitors"),
    retail_index: minMax(dataset, "retail_index"),
    avg_rent: minMax(dataset, "avg_rent"),
  }

  // Base normalized scores
  const populationScore = normalizePositive(
    area.population,
    ranges.population.min,
    ranges.population.max
  )

  const incomeScore = normalizePositive(
    area.avg_income,
    ranges.avg_income.min,
    ranges.avg_income.max
  )

  const footfallScore = normalizePositive(
    area.footfall,
    ranges.footfall.min,
    ranges.footfall.max
  )

  const retailIndexScore = normalizePositive(
    area.retail_index,
    ranges.retail_index.min,
    ranges.retail_index.max
  )

  const competitionScore = normalizeNegative(
    area.competitors,
    ranges.competitors.min,
    ranges.competitors.max
  )

  const rentScore = normalizeNegative(
    area.avg_rent,
    ranges.avg_rent.min,
    ranges.avg_rent.max
  )

  // Nonlinear smoothing
  const smoothed = {
    population: saturate(populationScore),
    income: saturate(incomeScore),
    footfall: saturate(footfallScore),
    retail_index: saturate(retailIndexScore),
    competition: saturate(competitionScore),
    rent: saturate(rentScore),
  }

  // Rent pain after premium threshold (₹120/sqft example)
  const rentPain = thresholdPenalty(area.avg_rent, 120, 1.2)

  // Default business weights (can be tuned later)
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

  // Core composite score
  let rawScore =
    W.population * smoothed.population +
    W.avg_income * smoothed.income +
    W.footfall * smoothed.footfall +
    W.retail_index * smoothed.retail_index +
    W.competitors * smoothed.competition +
    W.avg_rent * smoothed.rent

  // Apply structural penalty
  rawScore -= rentPain * 0.25

  const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)))

  return {
    score: finalScore,
    breakdown: {
      population: Math.round(smoothed.population),
      avg_income: Math.round(smoothed.income),
      footfall: Math.round(smoothed.footfall),
      retail_index: Math.round(smoothed.retail_index),
      competitors: Math.round(smoothed.competition),
      avg_rent: Math.round(smoothed.rent),
      rentPain: Math.round(rentPain),
    },
  }
}

export function getVerdict(score) {
  if (score >= 80) return { label: "High Potential", color: "green" }
  if (score >= 55) return { label: "Moderate Potential", color: "yellow" }
  return { label: "High Risk", color: "red" }
}
