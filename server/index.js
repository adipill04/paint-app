const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const Drawing = require('./models/drawing');
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
    // TODO: Change jwt secret to something bigger
    if(user) {
        const token = jwt.sign({
            _id: user._id,
            email: req.body.email
        }, 'secret123');
        return res.json({ user: token});
    } else {
        return res.json({ error: 'Login failed' });
    }
    
});

app.get('/api/verify', async (req, res) => {
    const token = req.headers['x-access-token'];
    // TODO: Change jwt secret to something bigger
    if(token) {
        jwt.verify(token, 'secret123', (err, decoded) => {
            if(err) {
                console.log(err);
                return res.json({ auth: false, message: 'Not a valid token!'})
            }
        })
        return res.json({ auth: true, user: token});
    } else {
        return res.json({ error: 'Login failed' });
    }
    
});

app.post('/api/uploadDrawing', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedJwt = jwt.decode(token);
        let userId = decodedJwt['_id'];
        console.log("userId: ", userId);
        const { name, type, img } = req.body;
        const drawing = new Drawing({
            name, 
            type,
            img,
            owner: userId,
            createdAt: new Date()
        });

        const newDrawing = await drawing.save();
        res.json({ message: 'Drawing uploaded successfully'});
    } catch (err) {
        console.log(err);
        res.json({ error: 'Drawing upload failed!'})
    }
});

app.get('/api/drawing/:id', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedJwt = jwt.decode(token);
        let userId = decodedJwt['_id'];
        console.log("userId: ", userId);
        let drawing = await Drawing.findOne({ _id: req.params.id, sharedWith: userId });
        drawing = {
            id: drawing._id,
            name: drawing.name, 
            src: drawing.img,
            createdAt: drawing.createdAt
        }
        res.json({ 
            drawing,
            message: 'Drawing fetched successfully'
        });
    } catch (err) {
        console.log(err);
        res.json({ error: 'Drawing fetch failed!'});
    }
});

app.get('/api/getDrawings', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedJwt = jwt.decode(token);
        let userId = decodedJwt['_id'];
        let userDrawings = await Drawing.find({
            owner: userId
        }).exec();
        userDrawings = userDrawings.map(userDrawing => ({
            id: userDrawing._id,
            name: userDrawing.name, 
            src: userDrawing.img,
            createdAt: userDrawing.createdAt
        })); 

        let otherDrawings = await Drawing.find({ 
            $and: [
                {
                    $or: [
                        { type: "public" }, 
                        { type: "private", sharedWith: userId }
                    ],
                },
                { owner: { $ne: userId }}
            ] 
        }).exec();
        otherDrawings = otherDrawings.map(otherDrawing => ({
            id: otherDrawing._id,
            name: otherDrawing.name, 
            src: otherDrawing.img,
            createdAt: otherDrawing.createdAt
        })); 

        res.json({ 
            userDrawings,
            otherDrawings,
            success: 'Drawings fetched successfully'});
    } catch (err) {
        console.log(err);
        res.json({ error: 'Drawings fetch failed!'})
    }
});

app.delete('/api/deleteDrawing/:drawingId', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedJwt = jwt.decode(token);
        let userId = decodedJwt['_id'];
        Drawing.findOneAndDelete({ _id: req.params.drawingId, owner: userId })
        .exec()
        .then(() => res.status(200).json({ message: 'Drawing deleted' }))
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Start Server
app.listen(PORT, () => {
    console.log('Server has started on port 1337');
});