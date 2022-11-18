const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log("DB connecvtion successfull"))

const toursSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  price: Number
})



console.log(process.env);

//Creating a web server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
