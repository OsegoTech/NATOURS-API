const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const app = require('./app')



console.log(process.env);

//Creating a web server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
