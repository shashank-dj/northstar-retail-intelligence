export function getCategoryRecommendations(area) {
  const categories = []

  // QSR Logic
  let qsrScore = 0
  if (area.footfall > 120000) qsrScore += 2
  if (area.competitors < 55) qsrScore += 1
  if (area.avg_rent < 70000) qsrScore += 1

  // Fashion Logic
  let fashionScore = 0
  if (area.avg_income > 1500000) fashionScore += 2
  if (area.retail_index > 78) fashionScore += 1
  if (area.footfall > 90000) fashionScore += 1

  // Grocery Logic
  let groceryScore = 0
  if (area.population > 300000) groceryScore += 2
  if (area.avg_rent < 60000) groceryScore += 1
  if (area.competitors < 35) groceryScore += 1

  categories.push({
    name: "QSR",
    score: qsrScore,
    reason: "Driven by high footfall and quick consumption demand.",
  })

  categories.push({
    name: "Fashion",
    score: fashionScore,
    reason: "Supported by higher income households and retail activity.",
  })

  categories.push({
    name: "Grocery",
    score: groceryScore,
    reason: "Backed by residential density and daily needs demand.",
  })

  return categories
    .sort((a, b) => b.score - a.score)
    .map((c) => ({
      ...c,
      suitability:
        c.score >= 4
          ? "Highly Suitable"
          : c.score >= 2
          ? "Moderately Suitable"
          : "Low Suitability",
    }))
}
