package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

func main() {
	var envPath = ".env"
	var videosPath = "./videos"
	if _, err := os.Stat(".env"); os.IsNotExist(err) {
		fmt.Println("Searching for .env file in parent directory")
		envPath = "../.env"
		videosPath = ".././videos"
	}

	err := godotenv.Load(envPath)
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		log.Fatal(err)
	}
	jwtSecret := os.Getenv("JWT_SECRET")
	secretKey := []byte(jwtSecret)
	filePath := videosPath + "/segment.m3u8"
	ticker := time.NewTicker(10 * time.Second)
	quit := make(chan struct{})

	formatManifest(filePath)
	go simulateLiveStream(ticker, quit, filePath)
	handleRequests(port, videosPath, secretKey)
}
