package controller

import (
	"crypto-finance/src/domain/usecase"
	"crypto-finance/src/presentation/dto"
	"fmt"
)

type AuthController struct {
	authUsecase *usecase.AuthUseCase
}

func NewAuthController(authUsecase *usecase.AuthUseCase) *AuthController {
	return &AuthController{
		authUsecase: authUsecase,
	}
}

func (c *AuthController) Auth(input interface{}) (interface{}, error) {
	req, ok := input.(*dto.Auth)
	if !ok {
		return nil, fmt.Errorf("invalid input format")
	}

	return c.authUsecase.Auth(req)
}
