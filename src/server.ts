import { app } from './app'

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000

app.listen({
  port: PORT
}).then(() => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
