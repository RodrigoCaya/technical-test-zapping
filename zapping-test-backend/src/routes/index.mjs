import { Router } from 'express'
import { checkAccess } from '../middlewares/authMiddleware.mjs'
import userRouter from './routes/user.mjs'

const router = Router()

router.get('/ping', (_, res) => { res.status(200).json({ status: 200, message: 'pong' }) })
router.use('/user', checkAccess, userRouter)


export default router