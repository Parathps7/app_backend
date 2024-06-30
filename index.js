const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB connection
const mongoURI = 'mongodb+srv://parath_saf:Motorola%40g4@cluster25356.24dv64h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster25356';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define a schema and model for the data to be saved
const dataSchema = new mongoose.Schema({
    name: String,
    license_plate_number: String,
    phone_number: String,
    email: String,
    department: String
});

const Data = mongoose.model('Data', dataSchema);

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Test API
app.get('/test', (req, res) => {
    res.send('Hello world');
});

// Save API
app.post('/save', async (req, res) => {
    const { name, license_plate_number, phone_number, email, department } = req.body;
    console.log(name, license_plate_number, phone_number, email, department);
    console.log(req);
    
    if (!name || !license_plate_number || !phone_number || !email || !department) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newData = new Data({
        name,
        license_plate_number,
        phone_number,
        email,
        department
    });

    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(500).json({ error: 'Error saving data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
