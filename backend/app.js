const express = require("express");
const morgan = require("morgan");
const dontenv = require("dotenv").config();
const cookieParser = require('cookie-parser');


//IMPORT DB
const app = express()
app.use(cookieParser());


app.use(morgan("dev"));


const db = require('./APP/Models/con_db')

db.connectDB();

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// ROUTERS
const loginRoutes = require('./APP/Routers/login_routes')
const userRouter = require('./APP/Routers/user_routes')
const taskRouter = require('./APP/Routers/task_routes');
const notificationRouter = require('./APP/Routers/notification_routes')

//MIDDLEWARE
app.use(loginRoutes);
app.use("/users", userRouter);
app.use("/task", taskRouter);
app.use("/notification", notificationRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
