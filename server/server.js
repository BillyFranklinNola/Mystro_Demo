require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')  
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const port = 8000;

require("./config/mongoose.config");

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json({limit: '50mb'}), express.urlencoded({ extended: true , limit: '50mb'}));

require('./routes/musician.routes')(app);
require('./routes/gig.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );