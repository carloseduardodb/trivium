package util

import (
	"context"
	"fmt"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

type FirebaseConfig struct {
	AuthClient *auth.Client
}

var config *FirebaseConfig

func InitFirebase(serviceAccountFile string) (err error) {
	if config != nil {
		return fmt.Errorf("firebase has already been initialized")
	}

	opt := option.WithCredentialsFile(serviceAccountFile)
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return fmt.Errorf("error initializing firebase app: %v", err)
	}

	authClient, err := app.Auth(context.Background())
	if err != nil {
		return fmt.Errorf("error initializing firebase Auth client: %v", err)
	}

	config = &FirebaseConfig{
		AuthClient: authClient,
	}
	log.Println("Firebase successfully initialized.")

	return nil
}

func GetAuthClient() *auth.Client {
	if config == nil || config.AuthClient == nil {
		log.Fatal("Firebase has not been initialized. Call InitFirebase first.")
	}
	return config.AuthClient
}
