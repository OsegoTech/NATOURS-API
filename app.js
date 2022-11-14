// Importing the express module
const express = require('express');
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

//initializing an instance of express
const app = express();

//3rd Party MiddleWares
app.use(morgan('dev'))

//Include a middleware which helps in the POST method
app.use(express.json());

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






//ROUTES

//Creating a web server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
