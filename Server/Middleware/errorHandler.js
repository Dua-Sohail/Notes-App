
const errorHandler = (err, req, res, next) => {
    const status = err.name === "ValidationError" ? 400 : 500;
  res.status(status).json({ message: err.message });    
};



module.exports= errorHandler;''