import { FC, PropsWithChildren } from "react";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { showErrorNotification } from "@/lib/helpers/notification";
import { requestMe } from "@/api/user/user";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  useEffectOnce(() => {
    (async () => {
      const data = await requestMe();

      if (!data) {
        showErrorNotification("Не удалось получить информацию о пользователе.");
        // navigate("/login");
      }
    })();
  });

  return children;
};
