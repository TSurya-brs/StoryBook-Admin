const notfound = (req, res, next) => {
  const error = new Error(
    `You are calling an undefined route ${req.originalUrl}`
  );
  res.status(404);
  next(error);
};

const errorhandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "developement" ? err.stack : null,
  });
};

export { notfound, errorhandler };
