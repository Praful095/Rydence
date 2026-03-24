package models

// SurgeLevel - Low/Medium/High surge ka level
type SurgeLevel string

const (
	SurgeLow    SurgeLevel = "LOW"
	SurgeMedium SurgeLevel = "MEDIUM"
	SurgeHigh   SurgeLevel = "HIGH"
)

// TrendDirection - price upar ja raha hai, neeche, ya stable
type TrendDirection string

const (
	TrendIncreasing TrendDirection = "INCREASING"
	TrendDecreasing TrendDirection = "DECREASING"
	TrendStable     TrendDirection = "STABLE"
)

// PricingInfo - current price aur surge details
type PricingInfo struct {
	CurrentPrice float64    `json:"current_price"`
	BasePrice    float64    `json:"base_price"`
	SurgePct     float64    `json:"surge_pct"`
	SurgeLevel   SurgeLevel `json:"surge_level"`
	Reasons      []string   `json:"reasons"`
	DisplayPrice string     `json:"display_price"`
}

// PredictionInfo - wait karo ya book karo
type PredictionInfo struct {
	ShouldWait    bool    `json:"should_wait"`
	WaitMinutes   int     `json:"wait_minutes"`
	SaveAmount    float64 `json:"save_amount"`
	Confidence    string  `json:"confidence"`
	ConfidencePct int     `json:"confidence_pct"`
	Message       string  `json:"message"`
}

// TrendInfo - price trend aur chart ke liye data
type TrendInfo struct {
	Direction   TrendDirection `json:"direction"`
	Label       string         `json:"label"`
	Description string         `json:"description"`
	PricePoints []float64      `json:"price_points"`
}

// RideInfoResponse - frontend ko yahi ek response milega
// Teen cheezein ek saath - pricing, prediction, trend
type RideInfoResponse struct {
	Pricing    PricingInfo    `json:"pricing"`
	Prediction PredictionInfo `json:"prediction"`
	Trend      TrendInfo      `json:"trend"`
}