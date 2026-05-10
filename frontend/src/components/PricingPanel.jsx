import axios from "axios"

const PricingPanel = ({
  fetchStartupData
}) => {

  const updatePricing = async (
    strategy,
    price
  ) => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/update-pricing",

        {
          user_id:
            localStorage.getItem("user_id"),

          strategy,

          price
        }
      )

      fetchStartupData()

    } catch (err) {

      console.log(err)
    }
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
        Pricing Strategy
      </h2>

      <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-4
      ">

        <button

          onClick={() =>
            updatePricing(
              "Budget",
              10
            )
          }

          className="
          bg-green-500
          rounded-2xl
          p-5
          font-semibold
          "
        >

          Budget Pricing

        </button>

        <button

          onClick={() =>
            updatePricing(
              "Standard",
              20
            )
          }

          className="
          bg-blue-500
          rounded-2xl
          p-5
          font-semibold
          "
        >

          Standard Pricing

        </button>

        <button

          onClick={() =>
            updatePricing(
              "Premium",
              40
            )
          }

          className="
          bg-purple-500
          rounded-2xl
          p-5
          font-semibold
          "
        >

          Premium Pricing

        </button>

      </div>

    </div>
  )
}

export default PricingPanel