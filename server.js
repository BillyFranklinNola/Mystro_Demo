require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')  
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const port = 8000;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    console.log('Running in production environment.');
    }  else {
    console.log('Running in development environment.');
}

require("./server/config/mongoose.config");

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


require('./server/routes/musician.routes')(app);
require('./server/routes/gig.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );