const { getAllStats } = require('../services/statsService');
const Response = require('../utils/response');

const handleGetStats = async (req, res) => {
    try {
        const stats = await getAllStats();
        return Response.success(res, 'Statistics retrieved successfully', stats);
    } catch (error) {
        console.error('Controller Error (handleGetStats):', error.message);
        return Response.error(res, 'Failed to retrieve statistics', 500);
    }
};

module.exports = {
    handleGetStats
};
