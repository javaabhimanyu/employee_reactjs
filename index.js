const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let employees = [
  { id: 1, name: 'John Doe', body: 'Frontend Developer' },
  { id: 2, name: 'Jane Smith', body: 'Backend Developer' },
];

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Create a new employee
app.post('/employees', (req, res) => {
  const newEmployee = { id: Date.now(), ...req.body };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Update an employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp.id == id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id != id);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
