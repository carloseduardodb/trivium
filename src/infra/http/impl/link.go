package impl

import "crypto-finance/src/domain/repository"

func NewFirebaseRepository() repository.FirebaseRepository {
	return NewFirebaseImpl()
}
