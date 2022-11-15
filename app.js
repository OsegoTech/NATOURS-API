// Importing the express module
const express = require('express');
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

//initializing an instance of express
const app = express();


//3rd Party MiddleWares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}


//Include a middleware which helps in the POST method
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

//Creating our owm middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
})

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;

