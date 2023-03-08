//importing Mongoose
const mongoose = require("mongoose");

//connect to the database
mongoose.connect("mongodb+srv://Ammuchakku:Ammuchakku123@cluster0.gxxfai6.mongodb.net/?retryWrites=true&w=majority")

//creating schema

const Schema = mongoose.Schema;
var movieSchema = new Schema({
movieName : String,
movieActor : String,
movieActress : String,
movieDirector : String,
movieYear : Date,
movieCamera : String,
movieProducer : String,
movieLanguage : String
});
var movieDetails = mongoose.model("movies",movieSchema);
//exporting module
module.exports = movieDetails;
