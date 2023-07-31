const mongoose = require('mongoose');

console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the databaseheroku logs', err));
