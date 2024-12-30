package main

import (
	_ "crypto-finance/src/presentation"
	"crypto-finance/src/util"
	"log"
)

func main() {
	if err := util.InitFirebase("src/config/gloveritas-apps-firebase-adminsdk-nn1lz-fbde4c3002.json"); err != nil {
		log.Fatalf("Erro crítico: %v", err)
	}

	app, err := initializeApp()
	if err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}

	if err := app.Server.Start(); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
