import { uiActions } from ".";
import { requestMe } from "../../api/user/user";
import { showErrorNotification } from "../../lib/helpers/notification";
import { AppDispatch } from "../store";

export const fetchUser = async (dispatch: AppDispatch) => {
  dispatch(uiActions.setRequestStarted("getUser"));
  try {
    const user = await requestMe();
    dispatch(uiActions.setUser(user));
  } catch {
    showErrorNotification("Ошибка при получении информации о пользователе");
  } finally {
    dispatch(uiActions.setRequestFinished("getUser"));
  }
};
