import logger from "./config/logger.js";

export const handler = async (stream) => {
  const { streamId, aggregateId, event, payload } = stream;

  logger.info(JSON.stringify({ event, aggregateId, payload }));
};
