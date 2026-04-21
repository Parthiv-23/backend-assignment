// in-memory storage for rate-limiting state.

/**
 * Stores valid timestamps within the current sliding window.
 * { [userId: string]: number[] }
 */
const requestLogs = new Map();

module.exports = {
    requestLogs
};
