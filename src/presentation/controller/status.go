package controller

import (
	presentation_repository "crypto-finance/src/presentation/repository"
	"net/http"
)

type StatusController struct{}

func NewStatusController() *StatusController {
	return &StatusController{}
}

func (s *StatusController) SetupRoutes(router presentation_repository.HttpRepository) {
	router.HandleFunc("/check-status", s.Status, http.MethodGet)
}

func (s *StatusController) Status(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "ok"}`))
}
