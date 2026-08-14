const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
/*app.get('/',(req,res)=>{//for receiving the request
    res.status(200).send("Hello from the server");//res.status() is for status 
})
app.get('/',(req,res)=>{
    res.status(300).json({message:"Hello from the server",app : "Natours"});
})*/
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`)
);
app.get('/api/v1/tours/:id/:x/:y?',(req,res)=>{///: specifies the variable in url ? indicates optional parameters which need not be always included in route 
    console.log(req.params);//this prints all the parameters in url route
    res.status(200).json({
   
        //status : 'success',
        //results : tours.length,//tours is a array so it make sense 
        data:{
            tours
        }
    })
})
/*app.post('/',(req,res)=>{
    res.send("you can post to this endpoint.....");
})*/
app.post('/api/v1/tours',(req,res)=>{
    //console.log(res.body);
    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/tours-simple.json`,JSON.stringify(tours,null,2),err=>{
        res.status(201).json({
            status : "Success",
            data :{
                tour : newTour
            }
        })
    })
})
const port = 3000;
app.listen(port,()=>{//for sending the request
    console.log(`App running on ${port}`);
})