// route/route.go
package route

import (
	"crypto-finance/src/presentation/controller"
	"crypto-finance/src/presentation/dto"
	"crypto-finance/src/presentation/middleware"
	presentation_repository "crypto-finance/src/presentation/repository"
	"fmt"
	"net/http"
)

func NewRoutes(
	router presentation_repository.HttpRepository,
	authController *controller.AuthController,
	statusController *controller.StatusController,
) error {
	router.HandleFunc("/check-status", statusController.Status, http.MethodGet)
	router.HandleFunc("/auth", middleware.JsonMiddleware(authController.Auth, &dto.Auth{}), http.MethodPost)

	protected := router.SubRouter("/auth")
	protected.Use(middleware.FirebaseAuthMiddleware())

	fmt.Println("Servidor iniciado em http://127.0.0.1:3000")
	return router.Start("127.0.0.1:3000")
}
