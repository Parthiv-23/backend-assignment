const { requestLogs } = require('../store/memoryStore');
const { getCurrentTimestamp } = require('../utils/timeHelper');
const { recordRequest } = require('./statsService');
const { RATE_LIMIT } = require('../config/constants');

// Sliding window rate limiting
const isAllowed = async (userId) => {
    const now = getCurrentTimestamp();
    
    if (!requestLogs.has(userId)) {
        requestLogs.set(userId, []);
    }
    
    const timestamps = requestLogs.get(userId);
    
    const activeWindow = timestamps.filter(t => (now - t) < RATE_LIMIT.WINDOW_MS);
    
    if (activeWindow.length < RATE_LIMIT.MAX_REQUESTS) {
        activeWindow.push(now);
        requestLogs.set(userId, activeWindow);
        
        recordRequest(userId, false);
        return true;
    }
    
    requestLogs.set(userId, activeWindow);
    recordRequest(userId, true);
    return false;
};

module.exports = {
    isAllowed
};
