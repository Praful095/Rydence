package services

import "rydence/models"

// PredictionConfig - har scenario ke liye wait & save data
type PredictionConfig struct {
	ShouldWait    bool
	WaitMinutes   int
	SaveAmount    float64
	Confidence    string
	ConfidencePct int
	Message       string
}

// predictionMap - scenario ke basis pe recommendation
var predictionMap = map[string]PredictionConfig{
	"rain": {
		ShouldWait:    true,
		WaitMinutes:   8,
		SaveAmount:    52,
		Confidence:    "MEDIUM",
		ConfidencePct: 62,
		Message:       "Demand easing as rain slows",
	},
	"normal": {
		ShouldWait:    false,
		WaitMinutes:   0,
		SaveAmount:    0,
		Confidence:    "HIGH",
		ConfidencePct: 88,
		Message:       "Prices near normal — book now!",
	},
	"event": {
		ShouldWait:    true,
		WaitMinutes:   20,
		SaveAmount:    90,
		Confidence:    "LOW",
		ConfidencePct: 45,
		Message:       "Event crowd dispersing — surge will ease",
	},
	"late": {
		ShouldWait:    false,
		WaitMinutes:   0,
		SaveAmount:    0,
		Confidence:    "HIGH",
		ConfidencePct: 80,
		Message:       "Late night pricing stays stable till 5 AM",
	},
}

// GetPrediction - should user wait or book now?
func GetPrediction(scenario string) models.PredictionInfo {
	cfg, ok := predictionMap[scenario]
	if !ok {
		cfg = predictionMap["normal"]
	}

	return models.PredictionInfo{
		ShouldWait:    cfg.ShouldWait,
		WaitMinutes:   cfg.WaitMinutes,
		SaveAmount:    cfg.SaveAmount,
		Confidence:    cfg.Confidence,
		ConfidencePct: cfg.ConfidencePct,
		Message:       cfg.Message,
	}
}