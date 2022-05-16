import "dotenv/config";

import { newEventStreamService as EventStream } from "@nelreina/redis-stream-consumer";

import { client } from "./config/redis-client.js";
import logger from "./config/logger.js";
import { handler } from "./event-handler.js";

const STREAM = process.env["STREAM"];
const SERVICE = "NODE-STREAM-SERVICE";

try {
  if (client.isOpen) {
    logger.info("Successfully connected to redis");

    const msg = await EventStream(client, STREAM, SERVICE, false, handler);
    logger.info(msg);

    const shutdown = async () => {
      try {
        logger.info("Disconnecting from redis...");
        await client.disconnect();
        logger.info("Shutdown HTTP server ...");
        // await server.close();
        process.exit(0);
      } catch (error) {
        logger.error(error.message);
        process.exit(1);
      }
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } else {
    logger.error("Could not connect to Redis client!");
  }
} catch (error) {
  logger.error(error.message);
}
