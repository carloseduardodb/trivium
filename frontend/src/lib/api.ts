import axios from "axios";
import { getAuth } from "firebase/auth";

const TOKEN_KEY = "@trivium:token";

const axiosConfig = {
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(axiosConfig);

let isRefreshing = false;
let failedQueue: any = [];
let retry = false;

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response) {
      const { data, status, config } = response;
      let errorMessage;

      switch (status) {
        case 400:
          errorMessage = "Requisição inválida";
          break;
        case 401: {
          errorMessage = "Não autorizado";

          if (data && data.message) {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user || retry) {
              localStorage.removeItem(TOKEN_KEY);
              window.location.href = "/auth/signin";
              return Promise.reject(new Error(errorMessage));
            }

            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
                .then((token) => {
                  config.headers.Authorization = `Bearer ${token}`;
                  return api(config);
                })
                .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;
            retry = true;

            try {
              const newToken = await user.getIdToken(true);
              localStorage.setItem(TOKEN_KEY, newToken);

              config.headers.Authorization = `Bearer ${newToken}`;

              processQueue(null, newToken as any);

              return api(config);
            } catch (refreshError: any) {
              processQueue(refreshError, null);
              localStorage.removeItem(TOKEN_KEY);
              window.location.href = "/auth/signin";
              return Promise.reject(refreshError);
            } finally {
              isRefreshing = false;
              retry = false;
            }
          }
          break;
        }
        case 403:
          errorMessage = "Acesso proibido";
          break;
        case 404:
          errorMessage = "Recurso não encontrado";
          break;
        case 500:
          errorMessage = "Erro interno do servidor";
          break;
        default:
          errorMessage = "Ocorreu um erro";
      }

      if (data && data.message) {
        errorMessage = data.message;
      }

      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  }
);

export default api;
