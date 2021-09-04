const mongoose = require('mongoose');

// Connect to Database
const dbURL = process.env.MONGODB_URI;

console.log('Connecting to MongoDB...');
mongoose.connect(dbURL)
    .then( result => {
        console.log('Connected to MongoDB.');
    })
    .catch( result => {
        console.log('Error connecting to MongoDB:', error.message);
    });

// Create Schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v; 
    }
});


module.exports = mongoose.model('Person', personSchema);