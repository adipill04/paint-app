const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    drawings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drawing'}]
});

module.exports = mongoose.model('User', UserSchema);