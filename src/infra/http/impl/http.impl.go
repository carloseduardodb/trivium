package impl

import (
	presentation_repository "crypto-finance/src/presentation/repository"
	"net/http"

	"github.com/gorilla/mux"
)

type HttpImpl struct {
	router *mux.Router
}

func NewHttpImpl() presentation_repository.HttpRepository {
	return &HttpImpl{router: mux.NewRouter()}
}

func (m *HttpImpl) HandleFunc(path string, handler http.HandlerFunc, method string) {
	m.router.HandleFunc(path, handler).Methods(method)
}

func (m *HttpImpl) SubRouter(pathPrefix string) presentation_repository.HttpRepository {
	return &HttpImpl{router: m.router.PathPrefix(pathPrefix).Subrouter()}
}

func (m *HttpImpl) Use(middleware func(http.Handler) http.Handler) {
	m.router.Use(middleware)
}

func (m *HttpImpl) Start(address string) error {
	return http.ListenAndServe(address, m.router)
}
