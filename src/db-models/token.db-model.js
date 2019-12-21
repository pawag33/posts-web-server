const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const TokenDbModel = mongoose.model('Token', taskSchema);

module.exports = TokenDbModel;