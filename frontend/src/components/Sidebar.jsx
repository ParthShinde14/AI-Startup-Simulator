import {
  LayoutDashboard,
  BarChart3,
  Brain,
  Settings
} from "lucide-react"

const Sidebar = () => {

  return (

    <div className="
    w-72
    min-h-screen
    bg-black/40
    backdrop-blur-xl
    border-r
    border-zinc-800
    p-6
    ">

      {/* LOGO */}

      <div className="mb-14">

        <h1 className="
        text-4xl
        font-black
        bg-gradient-to-r
        from-blue-400
        to-cyan-400
        bg-clip-text
        text-transparent
        ">
          StartupAI
        </h1>

      </div>

      {/* MENU */}

      <div className="space-y-4">

        <button className="
        flex
        items-center
        gap-4
        w-full
        p-4
        rounded-2xl
        bg-blue-500/10
        border
        border-blue-500/20
        text-blue-400
        ">

          <LayoutDashboard size={22} />

          Dashboard

        </button>

        <button className="
        flex
        items-center
        gap-4
        w-full
        p-4
        rounded-2xl
        hover:bg-zinc-900
        transition
        ">

          <BarChart3 size={22} />

          Analytics

        </button>

        <button className="
        flex
        items-center
        gap-4
        w-full
        p-4
        rounded-2xl
        hover:bg-zinc-900
        transition
        ">

          <Brain size={22} />

          AI Advisor

        </button>

        <button className="
        flex
        items-center
        gap-4
        w-full
        p-4
        rounded-2xl
        hover:bg-zinc-900
        transition
        ">

          <Settings size={22} />

          Settings

        </button>

      </div>

    </div>
  )
}

export default Sidebar