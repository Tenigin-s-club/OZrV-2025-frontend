import { request } from ".";
import { Answer, Chat, MessageServ } from "@/types";

export const requestMessages = async (chatId: string): Promise<MessageServ[]> =>
  await request.get(`/chat/chat_id?chat_id=${chatId}`);

export const requestChats = async (): Promise<Chat[]> =>
  await request.get("/chat");

export const requestSendMessage = async (
  question: string,
  lang: string,
  chatId: string | null = null
): Promise<Answer> => {
  if (chatId)
    return await request.post(`/question/${chatId}?language=${lang}`, {
      question,
    });
  return await request.post(`/question?language=${lang}`, { question });
};
