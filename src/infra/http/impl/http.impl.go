package impl

import (
	presentation_repository "crypto-finance/src/presentation/repository"
	"net/http"

	"github.com/gorilla/mux"
)

type HttpRouter struct {
	router *mux.Router
}

func NewHttpRouter() presentation_repository.HttpRepository {
	return &HttpRouter{router: mux.NewRouter()}
}

func (m *HttpRouter) HandleFunc(path string, handler http.HandlerFunc, method string) {
	m.router.HandleFunc(path, handler).Methods(method)
}

func (m *HttpRouter) SubRouter(pathPrefix string) presentation_repository.HttpRepository {
	return &HttpRouter{router: m.router.PathPrefix(pathPrefix).Subrouter()}
}

func (m *HttpRouter) Use(middleware func(http.Handler) http.Handler) {
	m.router.Use(middleware)
}

func (m *HttpRouter) Start(address string) error {
	return http.ListenAndServe(address, m.router)
}
