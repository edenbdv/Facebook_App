
const express = require('express');
var app = express();

const bodyParser = require('body-parser'); //post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // req will be in json 

// Increase the maximum request body size limit
app.use(bodyParser.json({ limit: '180mb' }));
app.use(bodyParser.urlencoded({ limit: '180mb', extended: true }));

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

CLIENT = process.env.CLIENT
IP_WEB_SERVER = process.env.IP_WEB_SERVER

const cors = require('cors');
// app.use(cors());
const corsOptions = {
    origin: `http://${IP_WEB_SERVER}:${CLIENT}`, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
  app.use(cors(corsOptions));  
  




CONNECTION_STRING = process.env.CONNECTION_STRING
PORT = process.env.PORT


const mongoose = require('mongoose');
mongoose.connect(CONNECTION_STRING);


// Call the initializeDatabase function
const  Init = require('./initializeDB');
Init.initializeDatabase();

app.use(express.static('public'))


const users = require('./routes/user');
app.use('/api/users', users);


const posts = require('./routes/posts');
app.use('/api/posts', posts);

const comments = require('./routes/comments');
app.use('/api', comments);


const tokens = require('./routes/token');
app.use('/api/tokens', tokens);


// app.listen(PORT);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend listening on port ${PORT}`);
});
