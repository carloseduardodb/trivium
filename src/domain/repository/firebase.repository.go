package repository

import (
	"crypto-finance/src/domain/class"
)

type FirebaseRepository interface {
	ValidateToken(token string) (bool, error)
	ConvertTokenInUser(token string) (*class.User, error)
}
