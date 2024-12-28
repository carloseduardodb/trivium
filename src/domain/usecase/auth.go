package usecase

import (
	"crypto-finance/src/domain/class"
	"crypto-finance/src/presentation/dto"
	"fmt"
)

func Auth(auth *dto.Auth) (*class.User, error) {
	cUser, err := class.NewUser("Carlos", "Yj6tZ@example.com", "photoPath")
	if err != nil {
		return nil, err
	}

	fmt.Print(cUser)

	return cUser, nil
}
