package repositorier

import (
	"crypto-finance/src/domain/entity"
)

type FirebaseRepositorier interface {
	ValidateToken(token string) (bool, error)
	ConvertTokenInUser(token string) (*entity.User, error)
}
