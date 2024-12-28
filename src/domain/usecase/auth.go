package usecase

import (
	"crypto-finance/src/domain/class"
	"crypto-finance/src/domain/repository"
	"crypto-finance/src/presentation/dto"
	"fmt"
)

type AuthUseCase struct {
	firebaseRepo repository.FirebaseRepository
}

func NewAuthUseCase(firebaseRepo repository.FirebaseRepository) *AuthUseCase {
	return &AuthUseCase{
		firebaseRepo: firebaseRepo,
	}
}

func (a *AuthUseCase) Auth(auth *dto.Auth) (*class.User, error) {
	a.firebaseRepo.ConvertTokenInUser(auth.Token)

	cUser, err := class.NewUser("Carlos", "Yj6tZ@example.com", "photoPath")
	if err != nil {
		return nil, err
	}

	fmt.Print(cUser)

	return cUser, nil
}
