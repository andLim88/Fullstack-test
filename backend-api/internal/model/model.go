package model

type Brand struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Voucher struct {
	ID      int    `json:"id"`
	BrandID int    `json:"brand_id"`
	Code    string `json:"code"`
	Points  int    `json:"points"`
}

type Transaction struct {
	ID          int `json:"id"`
	CustomerID  int `json:"customer_id"`
	TotalPoints int `json:"total_points"`
}

type TransactionDetail struct {
	ID            int `json:"id"`
	TransactionID int `json:"transaction_id"`
	VoucherID     int `json:"voucher_id"`
	PointsUsed    int `json:"points_used"`
}