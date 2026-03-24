package handlers

import (
	"rydence/models"
	"rydence/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetFullRideInfo - ek hi API call mein teeno cheezein
// GET /api/v1/ride-info?scenario=rain
func GetFullRideInfo(c *gin.Context) {
	scenario := c.DefaultQuery("scenario", "normal")

	response := models.RideInfoResponse{
		Pricing:    services.CalculateSurge(scenario),
		Prediction: services.GetPrediction(scenario),
		Trend:      services.GetTrend(scenario),
	}

	c.JSON(http.StatusOK, response)
}

// GetPricing - sirf pricing chahiye toh ye use karo
func GetPricing(c *gin.Context) {
	scenario := c.DefaultQuery("scenario", "normal")
	c.JSON(http.StatusOK, services.CalculateSurge(scenario))
}

// GetPredictionHandler - sirf prediction chahiye toh
func GetPredictionHandler(c *gin.Context) {
	scenario := c.DefaultQuery("scenario", "normal")
	c.JSON(http.StatusOK, services.GetPrediction(scenario))
}

// GetTrendHandler - sirf trend chahiye toh
func GetTrendHandler(c *gin.Context) {
	scenario := c.DefaultQuery("scenario", "normal")
	c.JSON(http.StatusOK, services.GetTrend(scenario))
}