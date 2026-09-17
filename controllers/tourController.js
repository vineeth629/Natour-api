const Tour = require('./../models/tourModel.js');

exports.getAllTours = async (req, res) => {
  try{
  //build query 
  //1)Filtering
  const queryObj = {...req.query}//this createes a shallow copy 
  const excludeFields = ['page','sort','limit','fields'];
  excludeFields.forEach(el=> delete queryobj[el])
  console.log(req.query,queryObj);

  //2)Advnced filtering 
  let  queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);//Example of regular expression
  console.log(JSON.parse(queryStr));
  
  const query = Tour.find(JSON.parse(queryStr));
    //{ difficulty : 'easy',duration : {gte: 5}}
    /*const tours = await Tour.find()
    .where('duration')
    .equals(5)
    .where('difficult')
    .equals('easy'); all of this are part of query prototype of mongoose
*/
  //execute query 
  const tours = await query ;
  //send response
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data:{
      tours
    }
  });
}catch(err){
  res.status(404).json({
    status:'Failed',
    message : err
  });
}
};

exports.getTour = async (req, res) => {
  try{
    const tours = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})
     res.status(200).json({
    status: 'success',
    results: tours.length,
    data:{
      tours
    }
  });

  }catch(err){
     res.status(404).json({
    status:'Failed',
    message : err
  });
  }
};

exports.createTour = async (req, res) => {

   //const newTour = new Tour({})
   //newTour.save()
   const newTour = await Tour.create(req.body);//newTour is newly created document


  res.status(201).json({
    status: 'success'
  });
};

exports.updateTour = async (req, res) => {
  try{
    const tour  = await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new : true,
      runValidators : true
    });
    res.status(200).json({
    status: 'success',
    data:{
      tour
    }
  });
  }catch(err){
    res.status(404).json({
      status:'failed',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try{
    const tours = await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
    status: 'success',
    data : null
  });
  }catch(err){
       res.status(404).json({
      status:'failed',
      message: err
    });
  }
};