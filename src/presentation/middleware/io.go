package middleware

import (
	"crypto-finance/src/util"
	"encoding/json"
	"net/http"
	"reflect"
)

type HandlerFunction func(input interface{}) (interface{}, error)

func JsonMiddleware(handler HandlerFunction, inputType interface{}) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		input := reflect.New(reflect.TypeOf(inputType).Elem()).Interface()
		if r.Body != nil {
			defer r.Body.Close()
			if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
				util.WriteErrorResponse(w, http.StatusBadRequest, "Invalid JSON input")
				return
			}
		}

		response, err := handler(input)
		if err != nil {
			util.WriteErrorResponse(w, http.StatusInternalServerError, err.Error())
			return
		}

		util.WriteSuccessResponse(w, http.StatusOK, response)
	}
}
