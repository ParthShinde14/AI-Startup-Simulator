// src/components/SimulationPanel.jsx

import { useState } from "react"
import axios from "axios"

const SimulationPanel = ({
  fetchStartupData
}) => {

  const [event, setEvent] =
    useState("")

  const simulateMonth = async () => {

    try {

      const res = await axios.post(

        "http://127.0.0.1:5000/simulate-month",

        {
          user_id:
            localStorage.getItem("user_id")
        }
      )

      setEvent(res.data.eventMessage)

      if (res.data.gameOver) {

        alert(res.data.failureReason)
      }

      if (res.data.success) {

        alert(
          "Congratulations! Your startup became a Unicorn!"
        )
      }

      fetchStartupData()

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="
    bg-gradient-to-br
    from-blue-500/10
    to-cyan-500/10
    border
    border-blue-500/20
    rounded-3xl
    p-8
    mt-8
    ">

      <h2 className="
      text-3xl
      font-bold
      mb-4
      ">
        Startup Simulation Engine
      </h2>

      <p className="
      text-zinc-400
      mb-6
      ">
        Simulate one month of startup growth,
        churn, revenue, expenses,
        valuation, and investor confidence.
      </p>

      <button

        onClick={simulateMonth}

        className="
        bg-gradient-to-r
        from-blue-500
        to-cyan-500
        px-8
        py-4
        rounded-2xl
        font-semibold
        hover:scale-105
        transition
        "
      >

        Simulate Next Month

      </button>

      {

        event && (

          <div className="
          mt-6
          bg-blue-500/10
          border
          border-blue-500/20
          rounded-2xl
          p-4
          text-blue-300
          ">

            {event}

          </div>
        )
      }

    </div>
  )
}

export default SimulationPanel