const express = require("express")
const app = express();
const http = require('http')
const   {Server} = require('socket.io')
const server =http.createServer(app) 
const cors = require('cors')
const io =new Server(server)
const cookieparser = require("cookie-parser")
const bodyParser = require('body-parser')



const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST','PUT','DELETE'],
};
// app.use(cors(corsOptions))



io.on("connection", (socket) => {
    console.log("A user connected");
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use(express.json())

const restaurantRoute =require('./route/restaurantRoute')

const allowedOrigins = [   "https://classy-basbousa-faedb0.netlify.app/","http://localhost:5173"]


app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, // Ensure cookies are sent
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    })
  );
  


 
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieparser());

app.use("/api", restaurantRoute )





module.exports = app