// pull in express
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const port = 9000;
const helmet = require('helmet');
// instanciate your server
const server = express();

// MIDDLEWARES

const greeter = (req, res, next) => {
  req.section = 'FSW-13';
  next();
};

const yell = (req, res, next) => {
  console.log(req.params)
  // modify req.params.name to upper case
  req.name = req.params.name.toUpperCase();
  // set, new name yelled, on req.name;
  // req.name = newName;
  // move into next piece of middleware;
  next();
};

server.use(logger('tiny'), cors(), helmet());// Brock's Way
// server.use(logger) // Ryan's Way
// server.use(cors());
// server.use(helmet());
// ROUTES
server.get('/name/:name', yell, greeter, (req, res) => {
  res.send(`${req.name} is in ${req.section}`);
});

server.get('/section', greeter, (req, res) => {
  res.send(`Hello ${req.section}, I <3 U!`);
});

// built a GET endpoint to `/` that returns the string hello world to the client.

server.get('/', (req, res) => {
  res.send('Cowabunga!');
});

server.get('/rapha', (req, res) => {
  res.send('I am Raphael');
});


// call server.listen w/ a port of your choosing
server.listen(port, () => {
  console.log(`Booyahkasha happening on ${port}`);
});
// hit your port+/ to see "hello wold!"