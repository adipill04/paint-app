const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const Drawing = require('./models/drawing');
const argon2 = require('argon2');

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
    const hash = await argon2.hash(req.body.password);
    try {
        await User.create({
            email: req.body.email,
            password: hash
        });
        res.json({ message: 'User registered successfully'});
    } catch (err) {
        res.json({ error: 'Duplicate email'})
    }

});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });
    if(user) {
        //argon2 to hash password in MongoDB
        const valid = argon2.verify(user.password, req.body.password);
        if (!valid) {
            return res.json({error: 'Incorrect Password!'})
        }
        const token = jwt.sign({
            _id: user._id,
            email: req.body.email
        }, process.env.JWT_SECRET);
        return res.json({ token: token, user: { email: req.body.email}});
    } else {
        return res.json({ error: 'Email not registered!' });
    } 
});

app.post('/api/uploadDrawing', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
        let userId = decodedJwt['_id'];
        const { name, type, img, drawTime } = req.body;
        const drawing = new Drawing({
            name, 
            type,
            img,
            drawTime,
            owner: userId,
            createdAt: new Date()
        });

        const newDrawing = await drawing.save();
        res.json({ message: 'Drawing uploaded successfully'});
    } catch (err) {
        res.json({ error: 'Drawing upload failed!'})
    }
});

app.get('/api/drawing/:id', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        let userId;
        const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedJwt !== null) {
            userId = decodedJwt['_id'];
        }
        let drawing = await Drawing.findOne({
            $or: [
                { _id: req.params.id, type: "public" },
                { _id: req.params.id, type: "private", sharedWith: userId },
                { _id: req.params.id, type: "private", owner: userId },
            ]
        }).exec();
        if(drawing === null) {
            return res.status(404).json({ error: 'Drawing not found!'});
        }
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
        const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
        let userId = decodedJwt['_id'];
        let userDrawings = await Drawing.find({
            owner: userId
        }).exec();
        userDrawings = userDrawings.map(userDrawing => ({
            id: userDrawing._id,
            name: userDrawing.name, 
            src: userDrawing.img,
            createdAt: userDrawing.createdAt,
            drawTime: userDrawing.drawTime
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
            createdAt: otherDrawing.createdAt,
            drawTime: otherDrawing.drawTime
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
        const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
        let userId = decodedJwt['_id'];
        Drawing.findOneAndDelete({ _id: req.params.drawingId, owner: userId })
        .exec()
        .then(() => res.status(200).json({ message: 'Drawing deleted' }))
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

app.post('/api/shareDrawing', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.userShareEmail,
        })
        Drawing.updateOne(
            { _id: req.body.drawingId, type: "private" },
            { $addToSet: { sharedWith: user._id } }
        ).exec()
        .then(() => res.status(200).json({ message: 'Drawing shared' }))
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Start Server
app.listen(PORT, () => {
    console.log('Server has started on port 1337');
});
