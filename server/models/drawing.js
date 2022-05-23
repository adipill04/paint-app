const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum : ['public','private'], required: true },
    img: { type: String, required: true },
    sharedWith: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now },
    drawTime: {type: Number}
});

module.exports = mongoose.model('Drawing', DrawingSchema);