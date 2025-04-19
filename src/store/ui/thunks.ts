import {
  requestChats,
  requestMessages,
  requestSendMessage,
} from "@/api/messages";
import { uiActions } from ".";
import { requestLogout, requestMe } from "../../api/user";
import { showErrorNotification } from "../../lib/helpers/notification";
import { AppDispatch } from "../store";
import { requestEvents } from "@/api/showcase";

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
    dispatch(
      uiActions.setMessages(
        messages.map(({ id, content, is_human, created_at }) => ({
          id,
          message: content,
          role: is_human ? "user" : "asistant",
          createdAt: new Date(created_at),
        }))
      )
    );
  } catch {
    showErrorNotification(
      `Ошибка при получении сообщений для чата – ${chatId}`
    );
  } finally {
    dispatch(uiActions.setRequestFinished("messages"));
  }
};

export const fetchSendMessage = async (
  dispatch: AppDispatch,
  question: string,
  lang: string,
  chatId: string | null = null
) => {
  const date = new Date();
  dispatch(
    uiActions.addMessage({
      id: "0",
      message: question,
      role: "user",
      createdAt: date,
    })
  );
  dispatch(uiActions.setRequestStarted("message"));
  try {
    const answer = await requestSendMessage(question, lang, chatId);
    if (answer.chat_id !== "00000000-0000-0000-0000-000000000000") {
      dispatch(
        uiActions.updateMessage({
          message: question,
          id: answer.human_message_id,
          role: "user",
          createdAt: date,
        })
      );
      dispatch(
        uiActions.addMessage({
          message: answer.message,
          id: answer.chat_message_id,
          role: "asistant",
          createdAt: new Date(),
        })
      );
      dispatch(uiActions.setChatOpened(answer.chat_id));
      dispatch(
        uiActions.addChat({
          name: question,
          id: answer.chat_id,
          createdAt: new Date().toISOString(),
        })
      );
    } else {
      dispatch(
        uiActions.addMessage({
          message: answer.message,
          id: String(Math.random() * 1000000),
          role: "asistant",
          createdAt: new Date(),
        })
      );
    }
  } catch {
    showErrorNotification(
      `Ошибка при получении сообщений для чата – ${chatId}`
    );
  } finally {
    dispatch(uiActions.setRequestFinished("messages"));
  }
};

export const fetchEvents = async (dispatch: AppDispatch) => {
  dispatch(uiActions.setRequestStarted("events"));
  try {
    const events = await requestEvents();
    dispatch(uiActions.setEvents(events));
  } catch {
    showErrorNotification(`Ошибка при получении событий`);
  } finally {
    dispatch(uiActions.setRequestFinished("events"));
  }
};
