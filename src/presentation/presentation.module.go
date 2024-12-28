package presentation

import (
	"crypto-finance/src/presentation/controller"

	"github.com/google/wire"
)

var PresentationModule = wire.NewSet(
	controller.NewAuthController,
	controller.NewStatusController,
)
