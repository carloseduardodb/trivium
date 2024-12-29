package presentation_repository

import "net/http"

type HttpRepository interface {
	HandleFunc(path string, handler http.HandlerFunc, method string)
	SubRouter(pathPrefix string) HttpRepository
	Use(middleware func(http.Handler) http.Handler)
	Start(address string) error
}
