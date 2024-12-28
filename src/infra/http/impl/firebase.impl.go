package impl

import (
	"context"
	"crypto-finance/src/domain/class"
	"crypto-finance/src/util"
	"errors"
)

type FirebaseImpl struct{}

func NewFirebaseImpl() *FirebaseImpl {
	return &FirebaseImpl{}
}

func (f *FirebaseImpl) ValidateToken(token string) (bool, error) {
	if token == "" {
		return false, errors.New("token não pode ser vazio")
	}

	_, err := util.GetAuthClient().VerifyIDToken(context.Background(), token)
	if err != nil {
		return false, errors.New("token inválido: " + err.Error())
	}

	return true, nil
}

func (f *FirebaseImpl) ConvertTokenInUser(token string) (*class.User, error) {
	if token == "" {
		return nil, errors.New("token não pode ser vazio")
	}

	decodedToken, err := util.GetAuthClient().VerifyIDToken(context.Background(), token)
	if err != nil {
		return nil, errors.New("erro ao decodificar token: " + err.Error())
	}

	userRecord, err := util.GetAuthClient().GetUser(context.Background(), decodedToken.UID)
	if err != nil {
		return nil, errors.New("erro ao obter informações do usuário: " + err.Error())
	}

	user := &class.User{
		Email:     userRecord.Email,
		Name:      userRecord.DisplayName,
		PhotoPath: userRecord.PhotoURL,
	}

	return user, nil
}
