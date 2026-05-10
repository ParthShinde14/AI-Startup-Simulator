const DecisionPanel = ({ makeDecision }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Business Decisions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <button
          onClick={() => makeDecision("hire")}
          className="bg-blue-600 hover:bg-blue-500 p-4 rounded-xl"
        >
          Hire Engineers
        </button>

        <button
          onClick={() => makeDecision("marketing")}
          className="bg-green-600 hover:bg-green-500 p-4 rounded-xl"
        >
          Run Marketing
        </button>

        <button
          onClick={() => makeDecision("funding")}
          className="bg-purple-600 hover:bg-purple-500 p-4 rounded-xl"
        >
          Raise Funding
        </button>

        <button
          onClick={() => makeDecision("pricing")}
          className="bg-orange-600 hover:bg-orange-500 p-4 rounded-xl"
        >
          Increase Pricing
        </button>

      </div>

    </div>
  )
}

export default DecisionPanel