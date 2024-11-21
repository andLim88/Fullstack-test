package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()


	router.HandleFunc("/brands", GetBrands).Methods("GET")
	router.HandleFunc("/brands", CreateBrand).Methods("POST")
	router.HandleFunc("/vouchers", GetVouchers).Methods("GET")
	router.HandleFunc("/vouchers", CreateVoucher).Methods("POST")
	router.HandleFunc("/vouchers/{id}", GetVoucherByID).Methods("GET")
	router.HandleFunc("/transactions", CreateTransaction).Methods("POST")
	router.HandleFunc("/transactions/{id}", GetTransactionByID).Methods("GET")

	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func GetBrands(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Get Brands endpoint"}`))
}

func CreateBrand(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Create Brand endpoint"}`))
}

func GetVouchers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Get Vouchers endpoint"}`))
}

func CreateVoucher(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Create Voucher endpoint"}`))
}

func GetVoucherByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Get Voucher by ID endpoint"}`))
}

func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Create Transaction endpoint"}`))
}

func GetTransactionByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Get Transaction by ID endpoint"}`))
}