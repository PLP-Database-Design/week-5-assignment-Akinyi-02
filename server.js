// Import required modules
const express = require('express');
const mysql = require('mysql2');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();


// Configure the database connection using credentials from .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const getPatients = "SELECT  patient_id,first_name, last_name, date_of_birth FROM patients"
  db.query(getPatients, (err, results) => {
    if (err) {
       return res.status(500).send('Error retrieving patients', err);
    }
    res.status(300).send(results)
  });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const getProviders = 'SELECT first_name, last_name, provider_specialty FROM providers';

  db.query(getProviders, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers');
      
    }
    res.status(500).send(results);
  });
});

// Question 3: Filter patients by first name
app.get('/patients/:firstName', (req, res) => {
  
  const getPatients = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';

  db.query(getPatients, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving patients by first name');
      return;
    }
    res.status(500).send(results);
  });
});

// Question 4: Retrieve all providers by specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

  db.query(query, [specialty], (err, results) => {
    if (err) {
     return res.status(500).send('Error retrieving providers by specialty');
      
    }
    res.status(500).send(results);
  });
});

// Listen to the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

