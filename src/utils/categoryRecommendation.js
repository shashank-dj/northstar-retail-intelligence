export function getCategoryRecommendations(area) {
  const categories = []

  // ---------- QSR ----------
  const qsrReasons = []
  let qsrScore = 0

  if (area.footfall > 120000) {
    qsrScore += 2
    qsrReasons.push("High daily footfall supports quick-service demand")
  }

  if (area.competitors < 55) {
    qsrScore += 1
    qsrReasons.push("Moderate competition leaves room for new QSR brands")
  }

  if (area.avg_rent < 70000) {
    qsrScore += 1
    qsrReasons.push("Rent levels are manageable for high-volume outlets")
  }

  categories.push({
    name: "QSR",
    score: qsrScore,
    reasons: qsrReasons,
  })

  // ---------- Fashion ----------
  const fashionReasons = []
  let fashionScore = 0

  if (area.avg_income > 1500000) {
    fashionScore += 2
    fashionReasons.push("Higher household income supports discretionary spending")
  }

  if (area.retail_index > 78) {
    fashionScore += 1
    fashionReasons.push("Strong retail ecosystem attracts fashion shoppers")
  }

  if (area.footfall > 90000) {
    fashionScore += 1
    fashionReasons.push("Consistent footfall improves brand visibility")
  }

  categories.push({
    name: "Fashion",
    score: fashionScore,
    reasons: fashionReasons,
  })

  // ---------- Grocery ----------
  const groceryReasons = []
  let groceryScore = 0

  if (area.population > 300000) {
    groceryScore += 2
    groceryReasons.push("High residential population supports daily needs retail")
  }

  if (area.avg_rent < 60000) {
    groceryScore += 1
    groceryReasons.push("Lower rents improve grocery store margins")
  }

  if (area.competitors < 35) {
    groceryScore += 1
    groceryReasons.push("Lower competition reduces cannibalization risk")
  }

  categories.push({
    name: "Grocery",
    score: groceryScore,
    reasons: groceryReasons,
  })

  // ---------- Final formatting ----------
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
