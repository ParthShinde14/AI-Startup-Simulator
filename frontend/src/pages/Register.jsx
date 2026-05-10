import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import toast from "react-hot-toast"

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:5000/register",
        {
          username,
          email,
          password,
        }
      )

      toast.success("Registration Successful")

      window.location.href = "/"

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Registration Failed"
      )
    }
  }

  return (

    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">

      <div className="bg-zinc-900 p-8 rounded-2xl w-96 border border-zinc-800">

        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        {/* USERNAME */}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 bg-zinc-800 rounded-xl outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-zinc-800 rounded-xl outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-zinc-800 rounded-xl outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* REGISTER BUTTON */}

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-500 transition p-3 rounded-xl"
        >
          Register
        </button>

        {/* LOGIN LINK */}

        <p className="text-zinc-400 mt-6 text-center">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Register