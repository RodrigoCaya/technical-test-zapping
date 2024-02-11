import { getUser, createUser, getAllUsers } from '../services/userService.mjs'
import { comparePassword, sign, hashPassword } from '../utils/login.mjs'

class UserController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email == null || password == null) {
        res.status(400).json({ status: 400, message: 'Email and password are required' })
        return
      }
      const user = await getUser(email)
      if (user == null) {
        res.status(404).json({ status: 401, message: 'User not found' })
        return
      }
      const checkPassword = await comparePassword(password, user.password)
      if (!checkPassword) {
        res.status(401).json({ status: 401, message: 'Invalid credentials' })
        return
      }
      const token = sign(user)
      res.status(200).json({ status: 200, token: token, name: user.name})
    } catch (error) {
      console.error('Error on login', error)
      res.status(500).json({ status: 500, message: 'Internal server error' })
    }
  }

  createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body
      if (name == null || email == null || password == null) {
        res.status(400).json({ status: 400, message: 'Name, email, password and role are required' })
        return
      }
      const user = await getUser(email)
      if (user != null) {
        res.status(400).json({ status: 400, message: 'User already exists' })
        return
      }
      const encryptPassword = await hashPassword(password)
      const userCreated = await createUser(name, email, encryptPassword)
      res.status(201).json({ status: 201, message: 'User created', data: userCreated })
    } catch (error) {
      console.error('Error on createUser', error)
      res.status(500).json({ status: 500, message: 'Internal server error' })
    }
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await getAllUsers()
      res.status(200).json({ status: 200, data: users })
    } catch (error) {
      console.error('Error on getAllUsers', error)
      res.status(500).json({ status: 500, message: 'Internal server error' })
    }
  }
}

export default new UserController()