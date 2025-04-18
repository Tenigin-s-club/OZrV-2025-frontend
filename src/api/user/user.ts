import { User } from "@/store/ui/types";
import { request } from "..";

export const requestLogout = async () => await request.post("/auth/logout");

export const requestMe = async (): Promise<User> =>
  await request.get("/auth/me");

export const requestLogin = async (email: string, password: string) =>
  await request.post("/auth/login", { email, password });

export const requestRegister = async (
  name: string,
  lastname: string,
  middlename: string,
  email: string,
  password: string
) =>
  await request.post("/auth/register", {
    fio: `${(lastname || "").trim()} ${(name || "").trim()} ${(
      middlename || ""
    ).trim()}`.trim(),
    email,
    password,
  });
