// const express = require('express');

// const apiRouter = require('./api-router.js');
// const configureMiddleware = require('./configure-middleware.js');

// const server = express();

// configureMiddleware(server);

// server.use('/api', apiRouter);

// module.exports = server;
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexStore = require("connect-session-knex")(session);
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const restricted = require("../auth/restricted-middleware.js");
const knex = require('../database/dbConfig');
const server = express();

const sessionConfig = {
    name: "le-cookies",
    secret: "keep secret",
    resave: false,
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 10, 
        secure: false, 
        httpOnly: true,
    },
    store: new KnexStore({
        knex,
        tablename: "sessions",
        createtable: true,
        sidfieldname: "sid",
        clearInterval: 1000 * 60 * 15,
        }),

    };
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));



server.use("/auth", authRouter);
server.use("/users", restricted, usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = server;
