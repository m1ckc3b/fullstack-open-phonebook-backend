const express = require('express')
const app = express()

app.use(express.json())

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
]

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons)
})

app.get('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)

  const person = persons.find(p => p.id === id)

  person ? res.status(200).json(person) : res.status(404).json({
    Error: 'Not found'
  })
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)

  persons = persons.filter(p => p.id !== id)

  res.status(200).json({ message: 'Remove successfully'})
})

const generatedId = () => {
  const lastId = persons.length > 0 
    ? Math.max(...persons.map(p => p.id))
    : 0
   return lastId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name || !body.number) {
    if (!body.name) {
      res.status(404).json({
        Error: 'Name missing'
      })
    } else {
      res.status(404).json({
        Error: 'Number missing'
      })
    }
  } else if(persons.find(p => p.name === body.name)) {
    res.status(400).json({
      Error: 'name must be unique'
    })
  } else {
    const person = {
      id: generatedId(),
      ...body
    }
    persons = persons.concat(person)
    res.status(201).json(person)
  }

})

app.get('/info', (req,res) => {
  const personsLen = persons.length
  const date = new Date()

  res.send(
    `Phonebook has info for ${personsLen} people\n${date}`
  )
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})