import { useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'

const Auth = ({ setToken, setUser }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  // ✅ Hook MUST be here
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    // Frontend validation
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      alert('Please fill all fields')
      return
    }

    try {
      const url = isLogin
        ? '/api/auth/login'
        : '/api/auth/register'

      const { data } = await axios.post(url, form)

      if (isLogin) {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('user', JSON.stringify(data.user))

        setToken(data.accessToken)
        setUser(data.user)

        navigate('/todos') // ✅ WORKS NOW
      } else {
        alert('Registration successful. Please login.')
        setIsLogin(true)
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Something went wrong'
      )
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={submitHandler} className="bg-white p-6 w-80 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {!isLogin && (
          <input
            className="border p-2 w-full mb-3"
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full mb-3 px-3 py-2 border rounded-md
                     focus:outline-none focus:ring-1 focus:ring-black"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          className="w-full mb-4 px-3 py-2 border rounded-md
                     focus:outline-none focus:ring-1 focus:ring-black"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm mt-3 text-center cursor-pointer"
        >
          {isLogin ? 'Create account' : 'Already have an account?'}
        </p>
      </form>
    </div>
  )
}

export default Auth
