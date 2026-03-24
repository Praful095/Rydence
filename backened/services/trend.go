package services

import "rydence/models"

// trendData - price trend aur chart points per scenario
var trendData = map[string]models.TrendInfo{
	"rain": {
		Direction:   models.TrendDecreasing,
		Label:       "Decreasing",
		Description: "Price dropping in next 10–15 mins",
		PricePoints: []float64{248, 242, 230, 218, 210, 200, 196, 198, 196},
	},
	"normal": {
		Direction:   models.TrendStable,
		Label:       "Stable",
		Description: "No major change expected soon",
		PricePoints: []float64{185, 184, 186, 185, 183, 184, 185, 186, 185},
	},
	"event": {
		Direction:   models.TrendDecreasing,
		Label:       "Peak — declining soon",
		Description: "Currently at peak — will fall in ~20 mins",
		PricePoints: []float64{310, 320, 318, 300, 270, 240, 210, 195, 188},
	},
	"late": {
		Direction:   models.TrendStable,
		Label:       "Stable",
		Description: "Late night pricing — consistent till 5 AM",
		PricePoints: []float64{210, 210, 211, 210, 209, 210, 211, 210, 210},
	},
}

// GetTrend - scenario ke liye trend data return karo
func GetTrend(scenario string) models.TrendInfo {
	trend, ok := trendData[scenario]
	if !ok {
		return trendData["normal"]
	}
	return trend
}