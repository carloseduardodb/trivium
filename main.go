package main

import (
	"crypto-finance/src/infra/http"
	"crypto-finance/src/presentation/route"
	"crypto-finance/src/util"
	"log"

	"github.com/google/wire"
)

func main() {
	if err := util.InitFirebase("src/config/gloveritas-apps-firebase-adminsdk-nn1lz-fbde4c3002.json"); err != nil {
		log.Fatalf("Erro crítico: %v", err)
	}

	wire.Build(http.HttpModule)

	if err := route.InitRoutes(); err != nil {
		log.Fatalf("Erro crítico: %v", err)
	}
}
