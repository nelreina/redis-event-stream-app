import "dotenv/config";

import { newEventStreamService as EventStream } from "@nelreina/redis-stream-consumer";

import { client } from "./config/redis-client.js";
import logger from "./config/logger.js";
import { handler } from "./event-handler.js";
import { SERVICE } from "./config/constants.js";

const STREAM = process.env["STREAM"];

const shutdown = async () => {
  try {
    logger.info("Disconnecting from redis...");
    await client.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

try {
  if (!client.isOpen) await client.connect();
  if (client.isOpen) {
    logger.info("Successfully connected to redis");

    const msg = await EventStream(client, STREAM, SERVICE, false, handler);
    logger.info(msg);

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } else {
    logger.error("Could not connect to Redis client!");
  }
} catch (error) {
  logger.error(error.message);
}
