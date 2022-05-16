docker rm event-stream -f
docker run --name event-stream -d  \
  -e SERVICE_NAME=NODE-SRV \
  -e STREAM=docker-stream \
  -e REDIS_URL=redis://172.17.0.1:6379 \
event-stream:latest

docker logs -f event-stream