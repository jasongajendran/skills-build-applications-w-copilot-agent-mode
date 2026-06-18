import { startServer } from './server'

startServer().catch((error) => {
  console.error('Server startup error:', error)
  process.exit(1)
})
