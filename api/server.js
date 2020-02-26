const express = require('express');

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;




// const express = require('express'); // import the express package

// const server = express(); // creates the server

// // handle requests to the root of the api, the / route
// server.get('/', (req, res) => {
//   res.send('Hello from Express');
// });

// // watch for connections on port 5000
// server.listen(3000, () =>
//   console.log('Server running on http://localhost:5000')
// );