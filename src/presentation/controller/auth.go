package controller

import (
	"crypto-finance/src/domain/usecase"
	"crypto-finance/src/presentation/dto"
	"fmt"
)

func Auth(input interface{}) (interface{}, error) {
	req, ok := input.(*dto.Auth)
	if !ok {
		return nil, fmt.Errorf("invalid input format")
	}

	return usecase.Auth(req)
}
