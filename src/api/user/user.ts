import { request } from "..";

export const requestLogout = async () => request.post("/profile/logout");

export const requestMe = async () => request.post("/profile/me");

export const requestLogin = async (email: string, password: string) =>
  request.post("/profile/login", { email, password });

export const requestRegister = async (
  name: string,
  lastname: string,
  middlename: string,
  email: string,
  password: string
) =>
  request.post("/profile/register", {
    name,
    lastname,
    middlename,
    email,
    password,
  });
