package infra

import (
	"crypto-finance/src/domain/repository"
	"crypto-finance/src/infra/http/impl"

	"github.com/google/wire"
)

func NewFirebaseRepository() repository.FirebaseRepository {
	return impl.NewFirebaseImpl()
}

var InfraModule = wire.NewSet(
	NewFirebaseRepository,
	impl.NewFirebaseImpl,
)
