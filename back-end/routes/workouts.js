
const express = require('express')
const router = express.Router()
const Workout = require('../models/workoutModel.js')

const { 
    createWorkout,
    getAllWorkouts,
    deleteWorkout, 
    getWorkout,
    updateWorkout
 } = require('../controllers/workoutControllers.js')

 // require auth for all workout routes
const requireAuth = require('../middleware/requireAuth.js')

router.use(requireAuth)  

router.get('/', getAllWorkouts);

router.get('/:id', getWorkout) 

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router;
