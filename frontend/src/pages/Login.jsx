import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import toast from "react-hot-toast"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password,
        }
      )

      // STORE AUTH DATA

      localStorage.setItem(
        "token",
        res.data.token
      )

      localStorage.setItem(
        "username",
        res.data.username
      )

      localStorage.setItem(
        "user_id",
        res.data.user_id
      )

      toast.success("Login Successful")

      // REDIRECT TO DASHBOARD

      window.location.href = "/dashboard"

    } catch (err) {

      console.log(err)

      console.log(err.response)

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      )
    }
  }

  return (

    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">

      <div className="bg-zinc-900 p-8 rounded-2xl w-96 border border-zinc-800">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        {/* EMAIL INPUT */}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-zinc-800 rounded-xl outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD INPUT */}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-zinc-800 rounded-xl outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-500 transition p-3 rounded-xl"
        >
          Login
        </button>

        {/* REGISTER LINK */}

        <p className="text-zinc-400 mt-6 text-center">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Login