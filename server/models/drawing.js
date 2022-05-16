const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    type: { type: Boolean, required: true},
    img: {
        data: Buffer,
        contentType: String,
        required: true
    },
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Drawing', DrawingSchema);