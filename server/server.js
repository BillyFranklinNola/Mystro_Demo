require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')  
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const fetchEnvironmentVariables = require('./config/aws.config');

require("./config/mongoose.config");

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


require('./routes/musician.routes')(app);
require('./routes/gig.routes')(app);

// -----------------------deployment-----------------------

__dirname = path.resolve();
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    console.log(path.join(__dirname, '../client/build'))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '/client/build', 'index.html')));
}
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('__dirname', __dirname)

// -----------------------deployment-----------------------



// async function startServer() {
//     try {
//         await fetchEnvironmentVariables();
//         if (process.env.NODE_ENV === 'production') {
//             console.log('Running in production environment.');
//             } else {
//             console.log('Running in development environment.');
//         }
//         app.listen(port, () => console.log(`Listening on port: ${port}`));
//     } catch (error) {
//         console.error('Error fetching environment variables:', error);
//     }
// }

// startServer();

app.listen(port, () => console.log(`Listening on port: ${port}`) );