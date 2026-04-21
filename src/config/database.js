const mongoose = require('mongoose');
const { DATABASE } = require('./constants');
const connectDatabase = async () => {
    try {
        await mongoose.connect(DATABASE.URI);
        console.log('Database connection established');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;
