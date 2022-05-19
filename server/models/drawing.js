const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum : ['public','private'], required: true },
    img: { type: String, required: true },
    shared: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Drawing', DrawingSchema);