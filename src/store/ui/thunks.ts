import { uiActions } from ".";
import { requestLogout, requestMe } from "../../api/user/user";
import { showErrorNotification } from "../../lib/helpers/notification";
import { AppDispatch } from "../store";

export const fetchUser = async (dispatch: AppDispatch) => {
  dispatch(uiActions.setRequestStarted("getUser"));
  try {
    const user = await requestMe();
    dispatch(uiActions.setUser(user));
  } catch {
    // showErrorNotification("Ошибка при получении информации о пользователе");
  } finally {
    dispatch(uiActions.setRequestFinished("getUser"));
  }
};

export const fetchLogout = async (dispatch: AppDispatch) => {
  dispatch(uiActions.setRequestStarted("logout"));
  try {
    await requestLogout();
    dispatch(uiActions.setUser(null));
  } catch {
    showErrorNotification("Ошибка при выходе из аккаунта");
  } finally {
    dispatch(uiActions.setRequestFinished("logout"));
  }
};
