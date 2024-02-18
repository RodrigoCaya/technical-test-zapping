package main

import (
	"log"
	"os"
	"strconv"
	"strings"
	"time"
)

// Modify the media sequence number and move the segment to the end of the manifest
func modifyMediaSequence(filePath string) {
	file, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(file), "\n")
	for i, line := range lines {
		if strings.Contains(line, "#EXT-X-MEDIA-SEQUENCE") {
			sequence := strings.Split(line, ":")
			sequenceNumber := sequence[1]
			sequenceInt, err := strconv.Atoi(sequenceNumber)
			if err != nil {
				log.Fatal(err)
			}
			sequenceInt++
			newSequence := "#EXT-X-MEDIA-SEQUENCE:" + strconv.Itoa(sequenceInt)
			lines[i] = newSequence
		} else if strings.Contains(line, "#EXTINF") {
			segment := lines[i+1]
			lines = append(lines[:i], lines[i+2:]...)
			lines = append(lines, line)
			lines = append(lines, segment)
			if strings.Contains(lines[i], "#EXT-X-DISCONTINUITY") {
				discontinuity := lines[i]
				lines = append(lines[:i], lines[i+1:]...)
				lines = append(lines, discontinuity)
			}
			break
		}
	}

	output := strings.Join(lines, "\n")
	err = os.WriteFile(filePath, []byte(output), 0644)
	if err != nil {
		log.Fatal(err)
	}
}

// Run the live stream simulation every 10 seconds
func simulateLiveStream(ticker *time.Ticker, quit chan struct{}, filePath string) {
	for {
		select {
		case <-ticker.C:
			modifyMediaSequence(filePath)
		case <-quit:
			ticker.Stop()
			return
		}
	}
}

// Format the manifest (m3u8) file
func formatManifest(filePath string) {
	file, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}

	var flagDiscontinuity bool = true
	lines := strings.Split(string(file), "\n")
	for i, line := range lines {
		if strings.Contains(line, "#EXT-X-ENDLIST") || line == "" {
			lines = append(lines[:i], lines[i+1:]...)
		}
		if strings.Contains(line, ".ts") && flagDiscontinuity {
			if i+1 < len(lines) && strings.Contains(lines[i+1], "#EXT-X-DISCONTINUITY") {
				flagDiscontinuity = false
			} else {
				segment, err := strconv.Atoi(strings.Split(strings.Split(line, ".ts")[0], "segment")[1])
				if err != nil {
					log.Fatal(err)
				}
				var nextSegment int = 0
				if i+1 < len(lines) {
					nextSegment, err = strconv.Atoi(strings.Split(strings.Split(lines[i+2], ".ts")[0], "segment")[1])
					if err != nil {
						log.Fatal(err)
					}
				}
				if segment > nextSegment {
					flagDiscontinuity = false
					discontinuity := "#EXT-X-DISCONTINUITY"
					if i+1 < len(lines) {
						lines = append(lines[:i+1], append([]string{discontinuity}, lines[i+1:]...)...)
					} else {
						lines = append(lines, discontinuity)
					}
				}
			}
		}
	}
	output := strings.Join(lines, "\n")
	err = os.WriteFile(filePath, []byte(output), 0644)
	if err != nil {
		log.Fatal(err)
	}
}
