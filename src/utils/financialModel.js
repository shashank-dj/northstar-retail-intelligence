// Category constants (can move to backend later)
export const CATEGORY_FACTORS = {
  beauty: 0.15,
  qsr: 0.18,
  apparel: 0.14,
  grocery: 0.12,
}

export function calculateRevenue({
  population,
  avg_income,
  retailScore,
  category = "beauty",
  correlationUplift = 0,
}) {
  const baseRevenue =
    population *
    (avg_income / 1_000_000) *
    CATEGORY_FACTORS[category] *
    (retailScore / 100)

  const adjustedRevenue = baseRevenue * (1 + correlationUplift)

  return {
    baseRevenue,
    adjustedRevenue,
  }
}

export function calculateFinancials({
  revenue,
  rent,
  operatingCostRatio = 0.65,
  initialInvestment,
}) {
  const operatingCosts = revenue * operatingCostRatio
  const ebitda = revenue - operatingCosts - rent

  const paybackMonths =
    ebitda > 0 ? initialInvestment / ebitda : Infinity

  return {
    operatingCosts,
    ebitda,
    paybackMonths,
  }
}

export function rentSensitivity({
  revenue,
  initialInvestment,
  rentScenarios = [120000, 150000, 200000],
}) {
  return rentScenarios.map((rent) => {
    const { ebitda, paybackMonths } = calculateFinancials({
      revenue,
      rent,
      initialInvestment,
    })

    return {
      rent,
      ebitda,
      paybackMonths,
    }
  })
}
