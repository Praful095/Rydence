package config

// AppConfig - poori app ki configuration ek jagah
type AppConfig struct {
	Port     string
	BaseFare float64
	Version  string
}

// SurgeThresholds - kab LOW, MEDIUM, HIGH decide hoga
type SurgeThresholds struct {
	LowMax    float64 // 0% to 10%  = LOW
	MediumMax float64 // 11% to 40% = MEDIUM
	// 40% se upar = HIGH (automatically)
}

// DefaultConfig - app start hone pe yahi values use hongi
var DefaultConfig = AppConfig{
	Port:     ":8080",
	BaseFare: 180.0,
	Version:  "v1",
}

// DefaultThresholds - surge level decide karne ke rules
var DefaultThresholds = SurgeThresholds{
	LowMax:    10.0,
	MediumMax: 40.0,
}

// GetSurgeLevel - surge percentage se level decide karo
// Services mein hardcode karne ki jagah yahan se lo
func GetSurgeLevel(surgePct float64) string {
	switch {
	case surgePct <= DefaultThresholds.LowMax:
		return "LOW"
	case surgePct <= DefaultThresholds.MediumMax:
		return "MEDIUM"
	default:
		return "HIGH"
	}
}