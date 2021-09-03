const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.json());

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
    if(!body) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    // Build New Entry
    const newPerson = {
        "id": Math.floor(Math.random() * 10000),
        "name": body.name,
        "number": body.number,
    };

    // Update Contacts
    persons = persons.concat(newPerson);

    res.json(persons);
});

// Read Contacts
app.get('/api/persons', (req, res) => {
    res.json(persons);
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});