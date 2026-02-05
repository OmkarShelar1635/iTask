import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = ({ user, setToken, setUser }) => {
  const navigate = useNavigate()

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-4 bg-yellow-100/90 backdrop-blur z-20"
      >

      <h1
        onClick={() => navigate('/')}
        className="text-2xl font-bold cursor-pointer"
      >
        iTask
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Hello, <span className="font-medium">{user?.name}</span>
        </span>

        <motion.button
          onClick={() => {
            localStorage.clear()
            setToken(null)
            setUser(null)
            navigate('/')
          }}
           whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          className="px-4 py-1 bg-white  shadow rounded-lg"
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  )
}

export default Navbar
