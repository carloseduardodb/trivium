package domain

import (
	"crypto-finance/src/domain/usecase"

	"github.com/google/wire"
)

var DomainModule = wire.NewSet(
	usecase.NewAuthUseCase,
)
