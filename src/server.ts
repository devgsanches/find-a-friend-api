import { app as server } from './fastify/app'

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333! 🚀')
  })
  .catch(err => {
    console.log('Error on starting server.', err)
  })
