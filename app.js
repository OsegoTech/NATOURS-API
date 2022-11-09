// Importing the express module
const express = require('express');
const fs = require('fs')

//initializing an instance of express
const app = express();
//Include a middleware which helps in the POST method
app.use(express.json());
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//Route handlers to get tours
const  getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
}

//Route handlers to get a tour with a specific id
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id)

  if (!tour){
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id'
    })
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour
    }
  })
}

//Route handlers to get create a tour
const createTour = (req, res) => {
  // console.log(req.body);
  const  newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour
      }
    })
  })

  // res.send('done!')
}

//Route handlers to update tour
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length){
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id'
    })
  }
  res.status(204).json({
    status: 'success',
    data: '<Updated Tour Herer.....>'
  })
}
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length){
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id'
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  })
}



// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour).patch(updateTour)
  .delete(deleteTour);



//Creating a web server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
