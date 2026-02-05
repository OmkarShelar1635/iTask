import { useEffect, useState } from 'react'
import axios from '../axios'
import Navbar from './Navbar'
import { motion, AnimatePresence } from 'framer-motion'

const Todo = ({ setToken, user, setUser }) => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  // Edit state
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  // Fetch todos
  const fetchTodos = async () => {
    const { data } = await axios.get('/api/todos')
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    const { data } = await axios.post('/api/todos', { text })
    setTodos([data, ...todos])
    setText('')
  }

  // Toggle completed
  const toggleCompleted = async (todo) => {
    const { data } = await axios.put(`/api/todos/${todo._id}`, {
      completed: !todo.completed
    })
    setTodos(todos.map(t => (t._id === data._id ? data : t)))
  }

  // Start edit
  const startEdit = (todo) => {
    setEditId(todo._id)
    setEditText(todo.text)
  }

  // Save edit
  const saveEdit = async (id) => {
    if (!editText.trim()) return

    const { data } = await axios.put(`/api/todos/${id}`, {
      text: editText
    })

    setTodos(todos.map(t => (t._id === id ? data : t)))
    setEditId(null)
    setEditText('')
  }

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null)
    setEditText('')
  }

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`)
    setTodos(todos.filter(t => t._id !== id))
  }

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <div className="pt-28">
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="max-w-2xl mx-auto  bg-white rounded-2xl shadow-lg p-8"
>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Your Todos
        </h2>

        {/* Add Todo */}
        <form onSubmit={addTodo} className="flex gap-2 mb-5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 rounded-xl
+            hover:bg-gray-900 transition-all"
          >
            Add
          </motion.button>
        </form>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {['all', 'active', 'completed'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm border
+             transition-all duration-300 ${filter === type
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-gray-100'
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400 py-10 italic">
           No todos yet. Add your first task!
          </p>

        ) : (
          <AnimatePresence>
            <ul className="space-y-3">
              {filteredTodos.map(todo => (
                <motion.li
                  key={todo._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleCompleted(todo)}
                    />

                    {editId === todo._id ? (
                      <input
                        value={editText}
                        onChange={(e) =>
                          setEditText(e.target.value)
                        }
                        className="flex-1 px-2 py-1 border rounded"
                      />
                    ) : (
                      <span
                        className={`${todo.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-800'
                          }`}
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>

                  {/* Right Buttons */}
                  <div className="flex gap-2 ml-3">
                    {editId === todo._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="text-green-600 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-500 text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-blue-600 text-sm"
                      >
                        Edit
                      </button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </ul>
          </AnimatePresence>
        )}
      </motion.div>
      </div>
    </div>
  )
}

export default Todo
