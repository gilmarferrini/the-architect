import express from 'express';

const app = express()

app.get('/', (request, response) => {
  return response.json({
    message: 'The Architect API is running!'
  })
})

export {
  app
}
