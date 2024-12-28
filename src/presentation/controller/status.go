package controller

import "net/http"

type StatusController struct{}

func NewStatusController() *StatusController {
	return &StatusController{}
}

func (s *StatusController) Status(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "ok"}`))
}
