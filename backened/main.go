// package main

// import (
// 	"fmt"
// 	"rydence/handlers"
// 	"rydence/middleware"

// 	"github.com/gin-gonic/gin"
// )

// func main() {
// 	// Gin router banao
// 	r := gin.Default()

// 	// CORS middleware lagao
// 	// Bina iske React frontend backend se baat nahi kar payega
// 	r.Use(middleware.CORS())

// 	// All routes /api/v1 ke under
// 	v1 := r.Group("/api/v1")
// 	{
// 		v1.GET("/pricing", handlers.GetPricing)
// 		v1.GET("/predict", handlers.GetPredictionHandler)
// 		v1.GET("/trend", handlers.GetTrendHandler)

// 		// Main endpoint - frontend sirf yahi use karega
// 		v1.GET("/ride-info", handlers.GetFullRideInfo)
// 	}

// 	// Port 8080 pe server start karo
// 	r.Run(":8080")
// 	fmt.Println("Server running on http://localhost:8080")
// }

package main

import (
	"os"

	"rydence/handlers"
	"rydence/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORS())

	v1 := r.Group("/api/v1")
	{
		v1.GET("/pricing", handlers.GetPricing)
		v1.GET("/predict", handlers.GetPredictionHandler)
		v1.GET("/trend", handlers.GetTrendHandler)
		v1.GET("/ride-info", handlers.GetFullRideInfo)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}