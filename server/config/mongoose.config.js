const mongoose = require('mongoose');

console.log(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database', err));
