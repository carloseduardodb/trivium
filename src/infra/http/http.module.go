package http

import (
	"crypto-finance/src/infra/http/impl"

	"github.com/google/wire"
)

var HttpModule = wire.NewSet(
	impl.NewFirebaseRepository,
	impl.NewFirebaseImpl,
)
