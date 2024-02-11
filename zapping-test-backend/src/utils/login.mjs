import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export const comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash)
  return result
}

export const sign = (user) => {
  return jwt.sign({
    id: user.id,
    role: user.role
  },
  process.env.JWT_SECRET ?? 'hola_zapping',
  { expiresIn: '8h' })
}
