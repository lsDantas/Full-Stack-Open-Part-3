require('dotenv').config();

const { response } = require('express');
const express = require('express');

const cors = require('cors')
var morgan = require('morgan');

const app = express();
const Person = require('./models/person');

app.use(express.json());
app.use(express.static('build'))
app.use(cors())

morgan.token('data', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

// Create Contact
app.post('/api/persons', (req, res) => {
    const body = req.body;

    // Reject if Content Missing
    if (!body.name || !body.number ) {
        return res.status(400).json({
            error: 'Content missing'
        });
    }

    // Build New Entry
    const person = new Person({
        name: body.name,
        number: body.number,
    });

    // Update Contacts
    person.save().then(savedPerson => {
        res.json(savedPerson);
        persons = persons.concat(savedPerson);
    });
});

// Read Contacts
app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people);
    });
});

app.get('/api/persons/:id', (req, res) => {
    // Identify Contact
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    // Send Contact if it Exists
    if (person) {
        res.json(person);
    }
    else { 
        res.status(404).end();
    }
});

// Delete Contact
app.delete('/api/persons/:id', (req, res) => {
    // Identify Contact
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    // Remove Contact if it Exists
    if (person) { 
        persons = persons.filter(person => person.id !== id);
    }
    
    // Respond with 204 regardless of result
    res.status(204).end()
});

// Inform about Phonebook Contents
app.get('/info', (req, res) => {
    const reqReceived = new Date;
    const personsInfo = `Phonebook has info for ${persons.length} people.`;

    const message = `${personsInfo} </br> </br> ${reqReceived}`;

    res.send(message);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});