// Cache Duration: 10 minutes
export const CACHE_DURATION = 10 * 60 * 1000;

/**
 * Check if data is stale (older than 10 minutes)
 * @param {number} lastFetchTime - Timestamp of last fetch
 * @returns {boolean} true if data is stale, false if fresh
 */
export const isDataStale = (lastFetchTime) => {
  if (!lastFetchTime) return true; // No data exists
  return Date.now() - lastFetchTime > CACHE_DURATION;
};
