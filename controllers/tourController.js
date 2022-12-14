const Tour = require('./../models/tourModule')
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.reqTime);
  res.status(200).json({
    status: 'Success',
    requestedAt: req.reqTime
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

//Route handlers to get a tour with a specific id
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;


  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour,
  //   },
  // });
};

//Route handlers to get create a tour
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'Success'
    // data: {
    //   tour: newTour,
    // },
  });
};

//Route handlers to update tour
exports.updateTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: '<Updated Tour Herer.....>',
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
