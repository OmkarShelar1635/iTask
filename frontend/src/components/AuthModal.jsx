import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from '../axios'
import email_icon from '../assets/email_icon.svg'
import lock_icon from '../assets/lock_icon.svg'
import cross_icon from '../assets/cross_icon.svg'

const AuthModal = ({ isOpen, onClose, mode }) => {
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 
  useEffect(() => {
    if (isOpen) {
      setState(mode)
      document.body.style.overflow = 'hidden'
    }
    else {
    document.body.style.overflow = 'auto'
  }
  return () => {
    document.body.style.overflow = 'auto'
  }
     
  }, [mode, isOpen])


  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const url =
        state === 'Login'
          ? '/api/auth/login'
          : '/api/auth/register'

      const payload =
        state === 'Login'
          ? { email, password }
          : { name, email, password }

      const { data } = await axios.post(url, payload)

      if (state === 'Login') {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        onClose()
        window.location.href = '/todos'
      } else {
        alert('Account created successfully')
        setState('Login')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong')
    }
  }
 

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overscroll-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-[480px] rounded-2xl px-10 py-8 relative shadow-xl"
          >
            {/* Close */}
            <img
              src={cross_icon}
              onClick={onClose}
              className="absolute top-5 right-5 cursor-pointer"
              alt="close"
            />

            <h2 className="text-3xl font-bold text-center mb-2">
              {state}
            </h2>

            <p className="text-center text-gray-500 mb-6">
              {state === 'Login'
                ? 'Welcome back! Sign in to continue.'
                : 'Create an account to get started.'}
            </p>

            <form onSubmit={submitHandler}>
              {/* Name */}
              {state !== 'Login' && (
                <div className="border px-6 py-3 flex items-center gap-3 rounded-full mt-5">
                  <img src={email_icon} alt="" />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="outline-none text-sm w-full"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                </div>
              )}

              {/* Email */}
              <div className="border px-6 py-3 flex items-center gap-3 rounded-full mt-4">
                <img src={email_icon} alt="" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="outline-none text-sm w-full"
                  type="email"
                  placeholder="Email id"
                  required
                />
              </div>

              {/* Password */}
              <div className="border px-6 py-3 flex items-center gap-3 rounded-full mt-4">
                <img src={lock_icon} alt="" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="outline-none text-sm w-full"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              <p className="text-sm text-blue-600 my-4 cursor-pointer">
                Forgot password?
              </p>

              <button className="bg-blue-600 w-full text-white py-3 rounded-full font-medium">
                {state === 'Login' ? 'login' : 'create account'}
              </button>

              {state === 'Login' ? (
                <p className="mt-5 text-center">
                  Don't have an account?{' '}
                  <span
                    onClick={() => setState('Sign Up')}
                    className="text-blue-600 cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p className="mt-5 text-center">
                  Already have an account?{' '}
                  <span
                    onClick={() => setState('Login')}
                    className="text-blue-600 cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
