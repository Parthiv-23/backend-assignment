module.exports = {
    // Rate limit configuration
    RATE_LIMIT: {
        MAX_REQUESTS: 5,
        WINDOW_MS: 60000
    },
    // Server configuration
    SERVER: {
        PORT: process.env.PORT || 3000
    },
    // Database configuration
    DATABASE: {
        URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rate_limit_db'
    }
};
