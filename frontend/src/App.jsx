import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { Toaster } from "react-hot-toast"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (

    <BrowserRouter>

      {/* TOAST NOTIFICATIONS */}

      <Toaster position="top-right" />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App