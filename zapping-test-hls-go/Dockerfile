FROM golang:1.22

# Create app directory
WORKDIR /usr/src/app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
# COPY cmd/ .
# COPY .env .
# COPY videos/ ./videos
COPY . .

# Environment variables
ENV JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzM1MDQ0MywiaWF0IjoxNzA3MzUwNDQzfQ.-YTWFILlJ62hdlZq-VSUXDQjsE-WGqUaobsQ8KiVZWw
ENV PORT=8000

# Build the Go app
RUN go build -o /go/bin/app ./...

# This container exposes port 8080 to the outside world
EXPOSE 8080

# Run the binary program produced by `go build`
CMD ["/go/bin/app"]