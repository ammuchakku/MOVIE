const express = require("express");
const movieDetails = require("./model/movieDb");
const path = require('path');
const app = new express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));

//cors policy
app.use((req,res, next) =>{
    res.setHeader("Acess-Control-Allow-Origin","*");
    res.setHeader("Acess-Control-Allow-Methods","GET, POST, PUT, DELETE");
    res.setHeader("Acess-Control-Allow-Headers","X-Requested-with,content-type");
    res.setHeader("Acess-Control-Allow-Credentials",true);
    next();
})

app.get('/api',(req, res)=>{
    res.send("Hello Sarika");
});

//creating the data

app.post('/api/create', (req,res)=>{
    try {
        let movie = new movieDetails(req.body); //passing the data to database
        movie.save(); //saving the data
        res.send("Data Added");
    }
    catch(error){
        res.status(500).send(error);
    }
});

//reading the data

app.get('/api/read', async (req,res)=>{
    try{
        let movie = await movieDetails.find();
        res.json(movie);
    }
    catch(error){
        res.status(500).send(error);
    }
});

//updating the data

app.post('/api/update', async (req,res) =>{
    try{
        let movie = await movieDetails.findByIdAndUpdate(req.body._id, req.body);
        res.send("Data Updated");
}
catch(error){
    res.status(500).send(error);
}
});

//deleting the data
app.post('/api/delete', async (req,res) =>{
    try{
        let movie = await movieDetails.findByIdAndDelete(req.body._id, req.body);
        res.send("Data Deleted");
    }
    catch(error){
        res.status(500).send(error);
    }
});
//searching the data

app.post('/api/search', async (req,res)=>{
    try
    {
        let movie = await movieDetails.find({"movieName" : {$regex: '.*' + req.body.movieName + '.*'}});
        res.json(movie);
    }
    catch(error)
    {
        res.status(500).send(error);
    }
});

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname,'/build/index.html'));
})
app.listen(7000,(req,res) =>{
    console.log("Listening to Port Number 7000");
});  