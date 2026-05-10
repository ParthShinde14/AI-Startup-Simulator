const AIAdvisor = ({
  startupData
}) => {

  const insights = []

  // RUNWAY

  if (startupData.runway < 6) {

    insights.push(
      "Critical runway risk detected. Reduce burn immediately."
    )
  }

  // CHURN

  if (startupData.churnRate > 0.06) {

    insights.push(
      "Customer churn is increasing. Improve product quality and retention."
    )
  }

  // PRODUCT QUALITY

  if (startupData.productQuality < 70) {

    insights.push(
      "Product quality is below optimal. Hire more engineers."
    )
  }

  // GROWTH

  if (startupData.growthRate < 5) {

    insights.push(
      "Growth is slowing. Increase marketing efficiency."
    )
  }

  // INVESTOR READINESS

  if (startupData.investorReadiness > 80) {

    insights.push(
      "Startup is highly attractive for investors. Consider raising funding."
    )
  }

  // BANKRUPTCY

  if (startupData.bankruptcyRisk > 60) {

    insights.push(
      "Bankruptcy probability is dangerously high."
    )
  }

  // MARKET PRESSURE

  if (startupData.competitorPressure > 60) {

    insights.push(
      "Competitor pressure is rising rapidly. Focus on differentiation."
    )
  }

  // SUCCESS

  if (startupData.growthRate > 15) {

    insights.push(
      "Excellent growth momentum detected."
    )
  }

  return (

    <div className="
    bg-zinc-900
    border
    border-zinc-800
    rounded-3xl
    p-8
    ">

      <h2 className="
      text-3xl
      font-bold
      mb-6
      ">
        Strategic AI Advisor
      </h2>

      <div className="
      space-y-4
      ">

        {

          insights.map((item, index) => (

            <div

              key={index}

              className="
              bg-zinc-800
              border
              border-zinc-700
              rounded-2xl
              p-4
              text-zinc-300
              "
            >

              {item}

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default AIAdvisor