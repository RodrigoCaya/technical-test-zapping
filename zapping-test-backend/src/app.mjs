import createError from 'http-errors'
import express from 'express'
import indexRouter from './routes/index.mjs'
import cors from 'cors'

const app = express()

// Middleware usage
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


// Routes
app.use('', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

export default app
