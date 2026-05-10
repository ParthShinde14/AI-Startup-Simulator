import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

const UserChart = ({ chartData }) => {

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
          User Growth
        </h2>

        <p className="text-zinc-400 mt-2">
          Startup user acquisition analytics
        </p>

      </div>

      <div className="h-[400px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="users"
              fill="#22c55e"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default UserChart