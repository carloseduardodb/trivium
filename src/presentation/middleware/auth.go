package middleware

import (
	"context"
	"crypto-finance/src/util"
	"log"
	"net/http"
	"strings"
)

type contextKey string

const tokenKey contextKey = "token"

func FirebaseAuthMiddleware() func(http.Handler) http.Handler {
	authClient := util.GetAuthClient()
	if authClient == nil {
		log.Fatalf("Erro ao obter o Firebase Auth Client. Certifique-se de que o Firebase foi inicializado corretamente.")
	}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "Cabeçalho Authorization está ausente", http.StatusUnauthorized)
				return
			}

			tokenString := strings.TrimPrefix(authHeader, "Bearer ")
			if tokenString == authHeader {
				http.Error(w, "Formato do cabeçalho Authorization inválido. Deve começar com 'Bearer '", http.StatusUnauthorized)
				return
			}

			token, err := authClient.VerifyIDToken(r.Context(), tokenString)
			if err != nil {
				http.Error(w, "Token não autorizado ou inválido", http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), tokenKey, token)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
