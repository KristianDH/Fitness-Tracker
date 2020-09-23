const router = require('express').Router();
const db = require('../models');

// Use 'db.Workout' to refernce the model and use the methods provided with the model to execute database operatioms

router.post('/api/workouts', (req, res) => {
  console.log("post req.body", req.body)
  // Replace <METHOD> with method to create document in collection with data in req body
  // Pass in data passed in from browser as input argument to the method
  db.Workout.create(
    req.body
  )

    // Fill in .then() with call back function that takes result from db as input argument and send it back to browser
    .then(function(data){
      console.log('data comfirmation ?', data)
      res.json(data)
    })

    // Fill in .catch() with call back function that takes error as input argument and send it back to browser
    .catch(function (err) {
      if (err) {
        console.log("error", err);
        return res.json(err)
      } 
    })
});

router.put('/api/workouts/:id', (req, res) => {
  console.log('Time to add that exercise to the workout we just made!!', req.params)
  console.log('put req.body', req.body)
  // Replace <METHOD> with method to Find the document with id passed in and update the document with data in req body
  // Look into mongoose doc for method to perform both find document by id and update the document
  // Look into a way to push data passed in to the exercises array in model
  // Fill in the input argument(s) to the method

  db.Workout.update(
    { _id: req.params.id }, 
    { $push: { exercises: req.body } },
) 
// Fill in .then() with call back function that takes result from db as input argument and send it back to browser
.then(function(data){
  console.log('did we jsut save ?? comfirmatin ?', data)
  res.json(data)
})

// Fill in .catch() with call back function that takes error as input argument and send it back to browser
.catch(function (err) {
  if (err) {
    console.log("error", err);
    return res.json(err)
  } 
})

   
   
});

router.get('/api/workouts', (req, res) => {
  // Replace <METHOD> with method to Find all workouts from collection
  db.Workout.find({})

    // Fill in .then() with call back function that takes result from db as input argument and send it back to browser
    .then(function(data){
      console.log('here are all the dudes from db!', data)
      res.json(data)
    })

    // Fill in .catch() with call back function that takes error as input argument and send it back to browser
    .catch(function (err) {
      if (err) {
        console.log("error", err);
        return res.status(503).json(err)
      } 
    })
});

router.get('/api/workouts/range', (req, res) => {
  // Replace <METHOD> with method to Find all workouts then limit with range
  // Look into mongoose doc for how to limit with range
  // Fill in the input argument(s) to the method

  // Search: How to find all and limit results to 10 monogoose

  db.Workout.find().limit(10)

    // Fill in .then() with call back function that takes result from db as input argument and send it back to browser
    .then(function(data){
      console.log('data', data)
      return res.json(data)
    })

    // Fill in .catch() with call back function that takes error as input argument and send it back to browser
    .catch(function (err) {
      if (err) {
        console.log("error", err);
        return res.status(503).json(err)
      } 
    })
});

router.delete('/api/workouts/:id', ({ body }, res) => {
  // Find document with id passed in as part of data
  // Look into mongoose doc for a method to perform both to find document with id and delete it
  // Review the front end javascript code to understand how docuisment id  passed to back end
  // Fill in the input argument(s) to the method


  //SEARCH: How to find by id and Delete mongoose

  // db.Workout.<METHOD>()
  db.Workout.deleteOne({ _id: req.params.id }) 
  .then(function (data) {
      console.log("data", data);
      return res.json(data)
    // deleted at most one tank document
  })
  .catch(function (err) {
    if (err) {
      console.log("error", err);
      return res.json(err)
    } 
  })


    // Fill in .then() with call back function that takes no input argument and send boolean 'true' back to browser
    // .then()

    // Fill in .catch() with call back function that takes error as input argument and send it back to browser
    // .catch();
});

module.exports = router;
