package main

// import (
// 	"crypto-finance/src/domain"
// 	"crypto-finance/src/infra"
// 	"crypto-finance/src/presentation"
// 	"crypto-finance/src/presentation/controller"
// 	presentation_repository "crypto-finance/src/presentation/repository"
// 	"crypto-finance/src/presentation/route"

// 	"github.com/google/wire"
// )

// type App struct {
// 	Router           presentation_repository.HttpRepository
// 	AuthController   *controller.AuthController
// 	StatusController *controller.StatusController
// }

// func InitializeApp() error {
// 	app, err := initializeApp()
// 	if err != nil {
// 		return err
// 	}

// 	return route.NewRoutes(app.Router, app.AuthController, app.StatusController)
// }

// func initializeApp() (*App, error) {
// 	panic(wire.Build(
// 		infra.InfraModule,
// 		presentation.PresentationModule,
// 		domain.DomainModule,
// 		wire.Struct(new(App), "*"),
// 	))
// }
