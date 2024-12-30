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

	if err := InitializeApp(); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
