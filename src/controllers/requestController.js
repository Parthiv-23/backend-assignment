const { isAllowed } = require('../services/rateLimiter');
const Response = require('../utils/response');
const { RATE_LIMIT } = require('../config/constants');

const handleRequest = async (req, res) => {
    const { user_id, payload } = req.body;

    if (!user_id) {
        return Response.error(res, 'Missing required field: user_id', 400);
    }

    try {
        const allowed = await isAllowed(user_id);

        if (allowed) {
            return Response.success(res, 'Request processed successfully', payload);
        }

        const errorMessage = `Rate limit exceeded. Maximum ${RATE_LIMIT.MAX_REQUESTS} requests per minute allowed.`;
        return Response.error(res, errorMessage, 429);
        
    } catch (error) {
        console.error('Controller Error (handleRequest):', error.message);
        return Response.error(res, 'Internal server error', 500);
    }
};

module.exports = {
    handleRequest
};
