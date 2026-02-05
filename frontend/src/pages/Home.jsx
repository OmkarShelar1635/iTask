
import { Link } from 'react-router-dom'
import homeImage from '../assets/homeimage.jpg'
import { motion } from 'framer-motion'
import { useState } from 'react'
import AuthModal from '../components/AuthModal'

const Home = () => {
  // const [showAuth, setShowAuth] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('Login')
  return (
    <div className="min-h-screen bg-[#FFF7A8]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-[#FFF59D]">
        <Link to="/" className="text-2xl font-bold">
          iTask
        </Link>

        <div className="flex gap-4">
          
          <motion.button
            onClick={() => {
              setAuthMode('Login')
              setShowAuth(true)
            }}
             whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1 bg-white  shadow rounded-lg"
          >
            Login
          </motion.button>

          <motion.button
            onClick={() => {
              setAuthMode('Sign Up')
              setShowAuth(true)
            }}
             whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1 bg-white  shadow rounded-lg"
          >
            Register
          </motion.button>

        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative min-h-[95vh] flex items-center"
        style={{
          backgroundImage: `url(${homeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl px-12"
        >
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Unleash Productivity with{' '}
            <span className="text-yellow-300">iTask</span>
          </h2>

          <p className="text-lg text-gray-200 mb-6 max-w-2xl">
            Capture tasks, manage activities, and stay organized effortlessly.
          </p>

          
          <motion.button
            onClick={() => {
              setAuthMode('Login')
              setShowAuth(true)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Get Started
          </motion.button>

        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 px-10">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why choose iTask?
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Stay Organized',
              desc: 'Manage activities with filters and updates.'
            },
            {
              title: 'Secure & Private',
              desc: 'JWT authentication keeps data safe.'
            },
            {
              title: 'Fast & Responsive',
              desc: 'Built with React, Tailwind & Framer Motion.'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -10,
                scale: 1.03,
                boxShadow: '0px 20px 40px rgba(0,0,0,0.15)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-6 rounded-xl bg-white text-center cursor-pointer"
            >
              <h4 className="text-xl font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="text-center py-6 text-gray-600">
        © {new Date().getFullYear()} Omkar.dev | All rights reserved.
        
      </footer>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={showAuth}
          mode={authMode}
        onClose={() => setShowAuth(false)}
      />
    </div>
  )
}

export default Home
