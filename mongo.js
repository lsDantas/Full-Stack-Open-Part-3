const mongoose = require('mongoose');

// Verify Commands
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
}
else {
    // Setup Database
    const dbPassword = process.argv[2];
    const url = `mongodb+srv://fullstack:${dbPassword}@cluster0.6uwcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    mongoose.connect(url);

    // Establish Person Schema
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    });

    const Person = mongoose.model('Person', personSchema);

    
    if (process.argv.length === 3) {
        // Display Contacts in Database
        Person.find({}).then(result => {
            console.log('phonebook');
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });
            mongoose.connection.close();
        })
    }
    else {
        // Add New Contact
        if (process.argv.length === 5 ) {
            
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            });

            // Save New Entry
            person.save().then(result => {
                console.log(`Added ${person.name} number ${person.number} to phonebook`);
                mongoose.connection.close();
            });
        }
    }
}


