package services

import (
	"rydence/models"
	"fmt"
	"math"
)

// ScenarioFactors - har scenario ke liye pricing factors
type ScenarioFactors struct {
	BaseMultiplier float64
	Reasons        []string
	Level          models.SurgeLevel
}

// BASE_PRICE - Koramangala to MG Road ka normal price
const BASE_PRICE = 180.0

// scenarioFactors - MVP mein mock data
// Real app mein ye weather API + demand data se calculate hoga
var scenarioFactors = map[string]ScenarioFactors{
	"rain": {
		BaseMultiplier: 1.38,
		Reasons:        []string{"Heavy rain", "Rush hour", "High demand area"},
		Level:          models.SurgeHigh,
	},
	"normal": {
		BaseMultiplier: 1.03,
		Reasons:        []string{"Clear weather", "Good supply", "Evening"},
		Level:          models.SurgeLow,
	},
	"event": {
		BaseMultiplier: 1.72,
		Reasons:        []string{"Concert ending", "Event venue nearby", "Driver shortage"},
		Level:          models.SurgeHigh,
	},
	"late": {
		BaseMultiplier: 1.17,
		Reasons:        []string{"Late night premium", "Fewer drivers", "Safety surcharge"},
		Level:          models.SurgeMedium,
	},
}

// CalculateSurge - scenario ke basis pe pricing calculate karo
func CalculateSurge(scenario string) models.PricingInfo {
	// Scenario nahi mila toh normal use karo
	factors, ok := scenarioFactors[scenario]
	if !ok {
		factors = scenarioFactors["normal"]
	}

	// Current price calculate karo
	currentPrice := math.Round(BASE_PRICE * factors.BaseMultiplier)

	// Surge percentage nikalo
	// Example: 1.38 multiplier = 38% surge
	surgePct := (factors.BaseMultiplier - 1) * 100

	return models.PricingInfo{
		CurrentPrice: currentPrice,
		BasePrice:    BASE_PRICE,
		SurgePct:     math.Round(surgePct*10) / 10,
		SurgeLevel:   factors.Level,
		Reasons:      factors.Reasons,
		DisplayPrice: fmt.Sprintf("₹%.0f", currentPrice),
	}
}