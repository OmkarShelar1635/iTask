import express from 'express'
import Todo from '../models/Todo.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// GET todos
router.get('/', authMiddleware, async (req, res) => {
  const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 })
  res.json(todos)
})

// CREATE todo
router.post('/', authMiddleware, async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    completed: false,
    user: req.userId
  })
  res.json(todo)
})

// UPDATE todo (text or completed)
router.put('/:id', authMiddleware, async (req, res) => {
  const { text, completed } = req.body

  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    {
      ...(text !== undefined && { text }),
      ...(completed !== undefined && { completed })
    },
    { new: true }
  )

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  res.json(todo)
})

// DELETE todo
router.delete('/:id', authMiddleware, async (req, res) => {
  await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.userId
  })
  res.sendStatus(204)
})

export default router
