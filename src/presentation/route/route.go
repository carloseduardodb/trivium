package route

import (
	"crypto-finance/src/presentation/controller"
	"crypto-finance/src/presentation/dto"
	"crypto-finance/src/presentation/middleware"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func InitRoutes() error {
	router := mux.NewRouter()

	router.HandleFunc("/check-status", controller.Status).Methods(http.MethodGet)
	router.HandleFunc("/auth", middleware.JsonMiddleware(controller.Auth, &dto.Auth{})).Methods(http.MethodPost)

	protected := router.PathPrefix("/auth").Subrouter()
	protected.Use(middleware.FirebaseAuthMiddleware())

	fmt.Println("Servidor iniciado em http://127.0.0.1:3000")
	if err := http.ListenAndServe("127.0.0.1:3000", router); err != nil {
		return fmt.Errorf("erro ao iniciar o servidor: %w", err)
	}

	return nil
}
