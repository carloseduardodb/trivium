package http

import (
	"crypto-finance/src/domain/repository"
	"crypto-finance/src/domain/usecase"
	"crypto-finance/src/infra/http/impl"

	"github.com/google/wire"
)

func NewFirebaseRepository() repository.FirebaseRepository {
	return impl.NewFirebaseImpl()
}

var HttpModule = wire.NewSet(
	NewFirebaseRepository,
	impl.NewFirebaseImpl,
	usecase.UseCaseSet,
)
