const UserStats = require('../models/UserStats');

const recordRequest = async (userId, isBlocked) => {
    const update = {
        $inc: {
            totalRequests: 1,
            [isBlocked ? 'blockedRequests' : 'successRequests']: 1
        }
    };
    
    try {
        await UserStats.findOneAndUpdate(
            { userId },
            update,
            { upsert: true, returnDocument: 'after' }
        );
    } catch (error) {
        console.error(`Failed to record stats for user ${userId}:`, error.message);
    }
};

const getAllStats = async () => {
    try {
        const records = await UserStats.find().lean();
        
        return records.reduce((acc, record) => {
            acc[record.userId] = {
                total_request: record.totalRequests || 0,
                success_request: record.successRequests || 0,
                blocked_request: record.blockedRequests || 0
            };
            return acc;
        }, {});
    } catch (error) {
        console.error('Failed to retrieve statistics:', error.message);
        return {};
    }
};

module.exports = {
    recordRequest,
    getAllStats
};
