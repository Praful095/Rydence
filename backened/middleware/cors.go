package middleware

import "github.com/gin-gonic/gin"

// CORS - React frontend (localhost:5173) se
// Go backend (localhost:8080) pe requests allow karna
func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "https://rydence-app.vercel.app")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type")

		// Browser pehle OPTIONS request bhejta hai (preflight)
		// Usse 204 se handle karo
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next() // Agle middleware ya handler pe jao
	}
}