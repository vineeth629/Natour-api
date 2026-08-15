const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
app.use(express.json());
app.use(morgan('dev'));
/*app.get('/',(req,res)=>{//for receiving the request
    res.status(200).send("Hello from the server");//res.status() is for status 
})
app.get('/',(req,res)=>{
    res.status(300).json({message:"Hello from the server",app : "Natours"});
})*/
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`)
);
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();//always ensure to call next()
})
app.get('/api/v1/tours/:id/',(req,res)=>{///: specifies the variable in url ? indicates optional parameters which need not be always included in route 
    console.log(req.params);//this prints all the parameters in url route
    const id = req.params.id*1;//js just converts the string to no when performing arithmetic operationon it 
    if(id>tours.length){
        return res.status(404).json({
            status : "Fail",
            message : "Inavlid id"
        });
    };
    const tour = tours.find(el =>el.id === id);//=== is the comparison operator
    res.status(200).json({
   
        status : 'success',
        //results : tours.length,//tours is a array so it make sense 
        requestedAT: req.requestTime,
        data:{
            tour
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
app.patch('/api/v1/tours/:id',(req,res)=>{
    const id = req.params.id*1;
     if(id>tours.length){
        return res.status(404).json({
            status : "Fail",
            message : "Inavlid id"
        });
    }
    res.status(200).json({
        status : 'Success',
        data :{
            tour : "Updated data here..."
        }
    })
})
app.delete('/api/v1/tours/:id',(req,res)=>{
    const id = req.params.id*1;
     if(id>tours.length){
        return res.status(404).json({
            status : "Fail",
            message : "Inavlid id"
        });
    }
    res.status(202).json({// no data status code
        status : 'Success',
        data :{
            tour : "NO data"
        }
    })
})
/*app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(patchTour)
.delete(deleteTour);*/
const port = 3000;
app.listen(port,()=>{//for sending the request
    console.log(`App running on ${port}`);
})