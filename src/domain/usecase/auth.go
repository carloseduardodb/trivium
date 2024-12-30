package usecase

import (
	"crypto-finance/src/domain/entity"
	"crypto-finance/src/domain/repositorier"
	"crypto-finance/src/presentation/dto"
	"fmt"
)

type AuthUseCase struct {
	firebaseRepo repositorier.FirebaseRepositorier
}

func NewAuthUseCase(firebaseRepo repositorier.FirebaseRepositorier) *AuthUseCase {
	return &AuthUseCase{
		firebaseRepo: firebaseRepo,
	}
}

func (a *AuthUseCase) Auth(auth *dto.Auth) (*entity.User, error) {
	_, err := a.firebaseRepo.ConvertTokenInUser(auth.Token)
	if err != nil {
		return nil, err
	}

	cUser, err := entity.NewUser("Carlos", "Yj6tZ@example.com", "photoPath")
	if err != nil {
		return nil, err
	}

	fmt.Print(cUser)

	return cUser, nil
}
