const express = require('express');
const tourController = require('../controllers/tourController')
const router = express.Router();

//Param middleware
router.param('id', tourController.checkID)

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);


router
  .route('/:id')
  .get(tourController.getTour)
  .put(tourController.updateTour)
  .delete(tourController.deleteTour);



module.exports = router;
