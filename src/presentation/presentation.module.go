package presentation

import (
	"crypto-finance/src/infra"
	"crypto-finance/src/presentation/controller"
	"crypto-finance/src/presentation/route"

	"github.com/google/wire"
)

func NewRoutes(authController *controller.AuthController, statusController *controller.StatusController) error {
	return route.NewRoutes(authController, statusController, infra.NewHttpRepository())
}

var PresentationModule = wire.NewSet(
	controller.NewAuthController,
	controller.NewStatusController,
	NewRoutes,
)
