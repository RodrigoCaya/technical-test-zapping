import { Router } from 'express'
import UserController from '../../controllers/userController.mjs'

const router = Router()

router.post('/login', UserController.login)
router.post('/create', UserController.createUser)
router.get('/all', UserController.getAllUsers)

export default router