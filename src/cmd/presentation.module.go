package cmd

import (
	"crypto-finance/src/presentation/controller"
	presentation_repository "crypto-finance/src/presentation/repository"
	"crypto-finance/src/presentation/route"

	"github.com/google/wire"
)

type ServerStarter interface {
	Start() error
}

type AppServer struct {
	AuthController   *controller.AuthController
	StatusController *controller.StatusController
	Router           presentation_repository.HttpRepository
}

func NewAppServer(auth *controller.AuthController, status *controller.StatusController, router presentation_repository.HttpRepository) *AppServer {
	return &AppServer{
		AuthController:   auth,
		StatusController: status,
		Router:           router,
	}
}

func (a *AppServer) Start() error {
	return route.NewRoutes(a.Router, a.AuthController, a.StatusController)
}

var PresentationModule = wire.NewSet(
	controller.NewAuthController,
	controller.NewStatusController,
	NewAppServer,
	wire.Bind(new(ServerStarter), new(*AppServer)),
)
