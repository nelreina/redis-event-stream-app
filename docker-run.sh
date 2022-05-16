docker rm event-stream -f
docker run --name event-stream -d  \
  -e STREAM=docker-stream \
event-stream:latest

docker logs -f event-stream
  # -e REDIS_URL=redis://172.17.0.1:6379 \