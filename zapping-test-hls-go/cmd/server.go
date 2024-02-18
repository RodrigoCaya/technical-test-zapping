package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
)

// Verify the token and return an error if it's invalid
func verifyToken(tokenString string, secretKey []byte) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err != nil {
		return err
	}
	if !token.Valid {
		return fmt.Errorf("invalid token")
	}
	return nil
}

// Add headers to the response and verify the token
func addHeaders(h http.Handler, secretKey []byte) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", "cache-control, Authorization")
		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			return
		}
		tokenString = tokenString[len("Bearer "):]
		err := verifyToken(tokenString, secretKey)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprint(w, "Invalid token")
			return
		}
		h.ServeHTTP(w, r)
	}
}

// Handle the requests
func handleRequests(port int, videosPath string, secretKey []byte) {
	http.HandleFunc("/", addHeaders(http.FileServer(http.Dir(videosPath)), secretKey))
	fmt.Printf("Starting server on %v\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
