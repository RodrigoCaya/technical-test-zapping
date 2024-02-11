import app from './app.mjs'
import http from 'http'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()
const port = process.env.PORT ?? 3001;

// Set port
app.set('port', port)

// Create server
const server = http.createServer(app)

// Listen on provided port
server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${port}`)
})

// Event listener for HTTP server "error" event
server.on('error', (e) => {
  console.log('Error: %o', e)
})
