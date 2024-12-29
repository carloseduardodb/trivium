package infra

import (
	"crypto-finance/src/domain/repository"
	"crypto-finance/src/infra/http/impl"
	presentation_repository "crypto-finance/src/presentation/repository"

	"github.com/google/wire"
)

func NewFirebaseRepository() repository.FirebaseRepository {
	return impl.NewFirebaseImpl()
}

func NewHttpRepository() presentation_repository.HttpRepository {
	return impl.NewHttpImpl()
}

var InfraModule = wire.NewSet(
	NewFirebaseRepository,
	NewHttpRepository,
)
