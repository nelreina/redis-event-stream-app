import logger from "./config/logger.js";

export const handler = async (msg) => {
  logger.info(JSON.stringify(msg));
};
