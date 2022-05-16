const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to MongoDB');
})
// Middleware
//  Parse request body as json
app.use(express.json());
//  For cross origin communication across different ports while developing locally
app.use(cors());

// Routes
app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        await User.create({
            email: req.body.email,
            password: req.body.password
        })
        res.json({ message: 'User registered successfully'});
    } catch (err) {
        res.json({ error: 'Duplicate email'})
    }
    
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(user) {
        return res.json({ user: true});
    } else {
        return res.json({ error: 'Login failed' });
    }
    
});

// Start Server
app.listen(PORT, () => {
    console.log('Server has started on port 1337');
});