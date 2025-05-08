require('dotenv').config()

const express = require('express')
const app = express() 

const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts.js');
const userRoutes = require('./routes/users.js')


app.use(express.json()) 

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes) 

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server listening on " + process.env.PORT)
    });
  })
  .catch((err) => {
    console.log(err) 
  })






