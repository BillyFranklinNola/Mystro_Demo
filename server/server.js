require('dotenv').config();

const express = require('express');
const cors = require('cors')  
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser')
const cloudinary = require('./middleware/cloudinary');

require("./config/mongoose.config");

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json({limit: '50mb'}), express.urlencoded({ extended: true , limit: '50mb'}));

require('./routes/musician.routes')(app);
require('./routes/gig.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );