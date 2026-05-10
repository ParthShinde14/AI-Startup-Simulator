import { motion } from "framer-motion"

const StatCard = ({
  title,
  value,
  growth
}) => {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      whileHover={{
        scale: 1.03
      }}

      transition={{
        duration: 0.4
      }}

      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-zinc-900
      to-black
      border
      border-zinc-800
      rounded-3xl
      p-6
      shadow-2xl
      "
    >

      {/* GLOW */}

      <div className="
      absolute
      -top-10
      -right-10
      w-32
      h-32
      bg-blue-500/10
      rounded-full
      blur-3xl
      "></div>

      <div className="relative z-10">

        {/* TITLE */}

        <p className="
        text-zinc-400
        text-sm
        font-medium
        ">
          {title}
        </p>

        {/* VALUE */}

        <h2 className="
        text-3xl
        font-bold
        mt-4
        tracking-tight
        ">
          {value}
        </h2>

        {/* GROWTH */}

        <p className="
        text-green-400
        mt-4
        text-sm
        font-medium
        ">
          {growth}
        </p>

      </div>

    </motion.div>
  )
}

export default StatCard