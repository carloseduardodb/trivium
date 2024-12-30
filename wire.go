package main

// import (
// 	"crypto-finance/src/domain"
// 	"crypto-finance/src/infra"
// 	"crypto-finance/src/presentation"
// 	"crypto-finance/src/presentation/controller"
// 	presentation_repository "crypto-finance/src/presentation/repository"

// 	"github.com/google/wire"
// )

// type App struct {
// 	Router           presentation_repository.HttpRepository
// 	AuthController   *controller.AuthController
// 	StatusController *controller.StatusController
// }

// func InitializeApp() error {
// 	_, err := initializeApp()
// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }

// func initializeApp() (*App, error) {
// 	panic(wire.Build(
// 		infra.InfraModule,
// 		presentation.PresentationModule,
// 		domain.DomainModule,
// 		wire.Struct(new(App), "*"),
// 	))
// }
