import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

const RevenueChart = ({ chartData }) => {

  return (

    <div className="
    bg-gradient-to-br
    from-zinc-900
    to-zinc-950
    border
    border-zinc-800
    rounded-3xl
    p-8
    mt-8
    shadow-2xl
    ">

      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Revenue Analytics
        </h2>

        <p className="text-zinc-400 mt-2">
          Monthly revenue performance
        </p>

      </div>

      <div className="h-[400px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default RevenueChart