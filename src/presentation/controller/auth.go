package controller

import (
	"crypto-finance/src/domain/usecase"
	"crypto-finance/src/presentation/dto"
	"crypto-finance/src/presentation/middleware"
	presentation_repository "crypto-finance/src/presentation/repository"
	"fmt"
	"net/http"
)

type AuthController struct {
	authUsecase *usecase.AuthUseCase
}

func NewAuthController(authUsecase *usecase.AuthUseCase) *AuthController {
	return &AuthController{
		authUsecase: authUsecase,
	}
}

func (a *AuthController) SetupRoutes(router presentation_repository.HttpRepository) {
	router.HandleFunc("/auth", middleware.JsonMiddleware(a.Auth, &dto.Auth{}), http.MethodPost)

	protected := router.SubRouter("/auth")
	protected.Use(middleware.FirebaseAuthMiddleware())
}

func (c *AuthController) Auth(input interface{}) (interface{}, error) {
	req, ok := input.(*dto.Auth)
	if !ok {
		return nil, fmt.Errorf("invalid input format")
	}

	return c.authUsecase.Auth(req)
}
