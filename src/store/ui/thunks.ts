import { requestChats, requestMessages } from "@/api/messages";
import { uiActions } from ".";
import { requestLogout, requestMe } from "../../api/user";
import { showErrorNotification } from "../../lib/helpers/notification";
import { AppDispatch } from "../store";

export const fetchUser = async (dispatch: AppDispatch) => {
  dispatch(uiActions.setRequestStarted("getUser"));
  dispatch(uiActions.setRequestStarted("chats"));
  try {
    const user = await requestMe();
    dispatch(uiActions.setUser(user));
    const chats = await requestChats();
    dispatch(uiActions.setChats(chats));
  } finally {
    dispatch(uiActions.setRequestFinished("getUser"));
    dispatch(uiActions.setRequestFinished("chats"));
  }
};

export const fetchLogout = async (dispatch: AppDispatch) => {
  dispatch(uiActions.setRequestStarted("logout"));
  try {
    await requestLogout();
    dispatch(uiActions.setUser(null));
    dispatch(uiActions.setChatOpened(null));
    dispatch(uiActions.setChats([]));
  } catch {
    showErrorNotification("Ошибка при выходе из аккаунта");
  } finally {
    dispatch(uiActions.setRequestFinished("logout"));
  }
};

export const fetchMessages = async (
  dispatch: AppDispatch,
  chatId: string | null
) => {
  console.log(chatId);
  dispatch(uiActions.setRequestStarted("messages"));
  try {
    if (!chatId) return dispatch(uiActions.setMessages([]));
    const messages = await requestMessages(chatId);
    dispatch(uiActions.setMessages(messages));
  } catch {
    showErrorNotification(
      `Ошибка при получении сообщений для чата – ${chatId}`
    );
  } finally {
    dispatch(uiActions.setRequestFinished("messages"));
  }
};
