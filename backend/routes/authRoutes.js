import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/User.js'

const router = express.Router()

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required'
    })
  }

  const exists = await User.findOne({ email })
  if (exists) {
    return res.status(400).json({
      message: 'User already exists'
    })
  }

  const hashed = await bcrypt.hash(password, 10)
  await User.create({ name, email, password: hashed })

  res.json({ message: 'Registered successfully' })
})


// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ message: 'Invalid credentials' })

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )

  user.refreshToken = refreshToken
  await user.save()

  res.json({
    accessToken,
    refreshToken,
    user: { id: user._id, name: user.name, email: user.email }
  })
})

// REFRESH TOKEN
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) return res.sendStatus(401)

  const user = await User.findOne({ refreshToken })
  if (!user) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
    if (err) return res.sendStatus(403)

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    )

    res.json({ accessToken: newAccessToken })
  })
})

// LOGOUT
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body
  await User.findOneAndUpdate({ refreshToken }, { refreshToken: null })
  res.sendStatus(204)
})

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.sendStatus(200)

  const token = crypto.randomBytes(32).toString('hex')

  user.resetToken = token
  user.resetTokenExpiry = Date.now() + 10 * 60 * 1000
  await user.save()

  console.log(`Reset link: http://localhost:5173/reset/${token}`)
  res.json({ message: 'Reset link sent' })
})

// RESET PASSWORD
router.post('/reset-password/:token', async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  })

  if (!user)
    return res.status(400).json({ message: 'Invalid or expired token' })

  user.password = await bcrypt.hash(req.body.password, 10)
  user.resetToken = null
  user.resetTokenExpiry = null
  await user.save()

  res.json({ message: 'Password updated' })
})

export default router
