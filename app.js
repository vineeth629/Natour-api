const express = require('express');
const app = express();
const fs = require('fs');
/*app.get('/',(req,res)=>{//for receiving the request
    res.status(200).send("Hello from the server");//res.status() is for status 
})
app.get('/',(req,res)=>{
    res.status(300).json({message:"Hello from the server",app : "Natours"});
})*/
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`)
);
app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status : 'success',
        data:{
            tours
        }
    })
})
app.post('/',(req,res)=>{
    res.send("you can post to this endpoint.....");
})
const port = 3000;
app.listen(port,()=>{//for sending the request
    console.log(`App running on ${port}`);
})