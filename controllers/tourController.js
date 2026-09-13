const Tour = require('./../models/tourModel.js');

exports.getAllTours = async (req, res) => {
  try{
  const tours = await Tour.find()
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