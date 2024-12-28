package usecase

import "github.com/google/wire"

var UseCaseSet = wire.NewSet(
	NewAuthUseCase,
)
