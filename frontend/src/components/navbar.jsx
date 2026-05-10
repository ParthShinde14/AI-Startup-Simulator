import {
  Moon,
  Sun,
  LogOut
} from "lucide-react"

const Navbar = ({
  darkMode,
  setDarkMode
}) => {

  const username =
    localStorage.getItem("username")

  const handleLogout = () => {

    localStorage.clear()

    window.location.href = "/"
  }

  return (

    <div className="
    sticky
    top-0
    z-50
    backdrop-blur-xl
    bg-black/30
    border-b
    border-zinc-800
    h-24
    flex
    items-center
    justify-between
    px-10
    ">

      <div>

        <h1 className="text-3xl font-bold">
          Startup Dashboard
        </h1>

        <p className="text-zinc-400 mt-1">
          Welcome back, {username}
        </p>

      </div>

      <div className="flex items-center gap-4">

        {/* THEME BUTTON */}

        <button

          onClick={() =>
            setDarkMode(!darkMode)
          }

          className="
          p-3
          rounded-2xl
          bg-zinc-900
          border
          border-zinc-700
          hover:scale-105
          transition
          "
        >

          {
            darkMode
              ? <Sun size={20} />
              : <Moon size={20} />
          }

        </button>

        {/* LOGOUT */}

        <button

          onClick={handleLogout}

          className="
          flex
          items-center
          gap-2
          bg-red-500
          hover:bg-red-400
          px-5
          py-3
          rounded-2xl
          transition
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  )
}

export default Navbar