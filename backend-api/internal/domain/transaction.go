package domain

import "time"

type Transaction struct {
    ID          int64             `json:"id"`
    CustomerID  string           `json:"customer_id"`
    TotalPoints int              `json:"total_points"`
    Items       []TransactionItem `json:"items"`
    CreatedAt   time.Time        `json:"created_at"`
}

type TransactionItem struct {
    ID          int64     `json:"id"`
    TransactionID int64    `json:"transaction_id"`
    VoucherID   int64     `json:"voucher_id"`
    PointsCost  int       `json:"points_cost"`
    CreatedAt   time.Time `json:"created_at"`
}
