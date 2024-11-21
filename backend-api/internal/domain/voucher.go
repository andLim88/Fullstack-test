package domain

import "time"

type Voucher struct {
    ID          int64     `json:"id"`
    BrandID     int64     `json:"brand_id"`
    Code        string    `json:"code"`
    Name        string    `json:"name"`
    Description string    `json:"description"`
    PointsCost  int       `json:"points_cost"`
    ValidUntil  time.Time `json:"valid_until"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}
