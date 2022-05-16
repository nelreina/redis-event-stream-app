FROM node:16-slim
ENV NODE_ENV=prodcution
ENV REDIS_URL=redis://172.17.0.1:6379
EXPOSE 5050

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .
CMD ["node", "src/index.js"]