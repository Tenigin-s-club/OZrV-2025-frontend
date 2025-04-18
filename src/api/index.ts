import axios, { AxiosError } from "axios";
import ENV from "../lib/config/env";
import { ApiError, AppApi } from "./types";
import { showErrorNotification } from "../lib/helpers/notification";

const defaultHeaders = {
  "Accept-Language": "ru",
  "Content-type": "application/json",
};

const createRequestInstance = (): AppApi => {
  const instance = axios.create({
    baseURL: ENV.apiBaseUrl,
    headers: defaultHeaders,
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => {
      if (error.status === 401) {
        showErrorNotification("Необходимо авторизоваться!");
        window.location.pathname = "/login";
        return;
      } else if (error.status === 500) {
        showErrorNotification("Сервер не доступен");
        return;
      }
      const errorObject = error.response?.data as ApiError | undefined;
      if (!!errorObject && typeof errorObject === "object") {
        throw Object.fromEntries(
          errorObject.errors.map((v) => [v.code, v.detail])
        );
      }
      throw error.message;
    }
  );
  return instance as AppApi;
};

export const request = createRequestInstance();
