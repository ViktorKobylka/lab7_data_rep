const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors());

//set headers to allow cross-origin requests and specific HTTP methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//add body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import Mongoose for database interaction
const mongoose = require('mongoose');
//connect to MongoDB database
mongoose.connect('mongodb+srv://admin:admin@cluster0.s6qbn.mongodb.net/DB14');

//define a schema for movies
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

//create a Mongoose model for movies
const movieModel = new mongoose.model('Movie', movieSchema);

/*app.get('/api/movies', (req, res) => {
    const movies = [
        {
          "Title": "Avengers: Infinity War (server)",
          "Year": "2018",
          "imdbID": "tt4154756",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
          "Title": "Captain America: Civil War (server)",
          "Year": "2016",
          "imdbID": "tt3498820",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
          "Title": "World War Z (server)",
          "Year": "2013",
          "imdbID": "tt0816711",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }
      ];
    res.status(200).json({movies})
});*/

//endpoint to create a new movie
app.post('/api/movies',async (req, res)=>{
    console.log(req.body.title);
    const { title, year, poster } = req.body; //extract movie details from request body

    const newMovie = new movieModel({title, year, poster}); //create a new movie document
    await newMovie.save(); //save it to the database

    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
});

//endpoint to get a single movie by its ID
app.get('/api/movie/:id', async (req, res) => {
  const movie = await movieModel.findById(req.params.id); //find movie by ID
  res.json(movie); //return movie
});

//endpoint to get all movies
app.get('/api/movies', async (req, res) => {
  const movies = await movieModel.find({}); //fetch all movies
  res.status(200).json({movies}); //return movies
});

//start server and log URL
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});