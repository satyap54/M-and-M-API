const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT || 6379);

module.exports = redisClient;