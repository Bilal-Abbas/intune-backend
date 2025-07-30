import Redis from "ioredis";

const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || "0"),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: null, // BullMQ requirement
  lazyConnect: true,
};

export const redis = new Redis(redisConfig);

redis.on("error", (error: Error) => {
  console.error("Redis connection error:", error);
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("ready", () => {
  console.log("Redis is ready");
});

export const redisConfigForBullMQ = {
  connection: redis,
  prefix: "email-queue",
};
