import { Event } from "@/store/ui/types";
import { request } from ".";
import { Answer, MessageServ } from "@/types";

export const requestEvents = async (): Promise<Event[]> =>
  await request.get("/event");

export const requestEvent = async (id: string): Promise<Event> =>
  await request.get(`/event/${id}`);

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
