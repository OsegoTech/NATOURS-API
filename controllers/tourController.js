const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req, res) => {
  console.log(req.reqTime);
  res.status(200).json({
    status: 'Success',
    requestedAt: req.reqTime,
    results: tours.length,
    data: {
      tours: tours
    }
  })
}

//Route handlers to get a tour with a specific id
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
  // console.log(req.body);
  const  newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
