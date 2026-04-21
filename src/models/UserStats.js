const mongoose = require('mongoose');
const userStatsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    totalRequests: {
        type: Number,
        default: 0
    },
    successRequests: {
        type: Number,
        default: 0
    },
    blockedRequests: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('UserStats', userStatsSchema);
