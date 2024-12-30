package cmd

import (
	"crypto-finance/src/domain/repositorier"
	"crypto-finance/src/infra/http/repository"
	presentation_repositorier "crypto-finance/src/presentation/repositorier"

	"github.com/google/wire"
)

func NewFirebaseRepository() repositorier.FirebaseRepositorier {
	return repository.NewAuthRepository()
}

func NewHttpRepository() presentation_repositorier.HttpRepositorier {
	return repository.NewHttpRepository()
}

var InfraModule = wire.NewSet(
	NewFirebaseRepository,
	NewHttpRepository,
)
