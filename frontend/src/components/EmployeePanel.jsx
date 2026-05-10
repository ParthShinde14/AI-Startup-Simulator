import axios from "axios"

const EmployeePanel = ({
  fetchStartupData
}) => {

  const hireEmployee = async (role) => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/hire-employee",

        {
          user_id:
            localStorage.getItem("user_id"),

          role
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
        Team Management
      </h2>

      <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-4
      ">

        <button

          onClick={() =>
            hireEmployee("engineer")
          }

          className="
          bg-blue-500
          hover:bg-blue-600
          rounded-2xl
          p-5
          font-semibold
          transition
          "
        >
          Hire Engineer
        </button>

        <button

          onClick={() =>
            hireEmployee("marketer")
          }

          className="
          bg-green-500
          hover:bg-green-600
          rounded-2xl
          p-5
          font-semibold
          transition
          "
        >
          Hire Marketer
        </button>

        <button

          onClick={() =>
            hireEmployee("sales")
          }

          className="
          bg-purple-500
          hover:bg-purple-600
          rounded-2xl
          p-5
          font-semibold
          transition
          "
        >
          Hire Sales
        </button>

        <button

          onClick={() =>
            hireEmployee("designer")
          }

          className="
          bg-orange-500
          hover:bg-orange-600
          rounded-2xl
          p-5
          font-semibold
          transition
          "
        >
          Hire Designer
        </button>

      </div>

    </div>
  )
}

export default EmployeePanel