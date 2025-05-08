
const Workout = require('../models/workoutModel.js')
const mongoose = require('mongoose');

// get all workouts
const getAllWorkouts = async (req, res) => {
    try{
        const user_id = req.user._id;
        const workouts = await Workout.find({user_id}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No Valid Workout!"})
    }

    try{
        const workout = await Workout.findById(id)
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({ error: "" })
    }
}

// create new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    const emptyFields = [];

    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    
    if(emptyFields.length > 0){
        res.status(400).json({ error: "Please fill in all of the fields", emptyFields })
    }

    try{
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load, user_id})
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: ""})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such workout!"})
    }

    try{
        const workout = await Workout.findByIdAndDelete(id)
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    try{
       const updatedWorkout = await Workout.findOneAndUpdate({_id: id}, { 
            ...req.body 
        });
        res.status(200).json(updatedWorkout)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = { 
    getAllWorkouts, 
    createWorkout, 
    deleteWorkout, 
    getWorkout,
    updateWorkout
}
