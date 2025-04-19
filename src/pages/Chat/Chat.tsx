import { CSSProperties, useEffect, useState } from "react";
import { useChat, type UseChatOptions } from "@ai-sdk/react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

import { Chat } from "@/components/ui/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { uiSelectors } from "@/store/ui";
import { transcribeAudio } from "@/lib/transcribeAudio";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../modules/AppSidebar/AppSidebar";
import { fetchMessages, fetchSendMessage, fetchUser } from "@/store/ui/thunks";
import Loader from "@/components/shared/Loader/Loader";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { showErrorNotification } from "@/lib/helpers/notification";

const LANGUAGES = [
  { id: "en", name: "English" },
  { id: "zh", name: "中文" },
  { id: "es", name: "Español" },
  { id: "hi", name: "हिन्दी" },
  { id: "ar", name: "العربية" },
  { id: "pt", name: "Português" },
  { id: "ru", name: "Русский" },
  { id: "ja", name: "日本語" },
  { id: "de", name: "Deutsch" },
  { id: "fr", name: "Français" },
];

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatBot(props: ChatDemoProps) {
  const [selectedModel, setSelectedModel] = useState(LANGUAGES[0].id);
  const dispatch = useAppDispatch();
  const requests = useSelector(uiSelectors.getRequests);
  const messages = useSelector(uiSelectors.getMessages);
  const { t, i18n } = useTranslation();
  const { stop, isLoading, setMessages } = useChat({
    ...props,
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
  });

  const append: (message: { role: "user"; content: string }) => void = (
    message
  ) => {
    fetchSendMessage(dispatch, message.content);
  };

  const handleSubmit = async (
    event?: React.FormEvent,
    input: string = "",
    clearValue?: VoidFunction
  ) => {
    if (!event || !event.preventDefault || !input || !clearValue)
      return showErrorNotification(
        "Не удалось отправить запрос, попробуйте еще раз!"
      );
    event.preventDefault();
    if (!input)
      return showErrorNotification(
        "Не удалось отправить запрос, попробуйте еще раз!"
      );
    clearValue();
    fetchSendMessage(dispatch, input);
  };

  const currentChatId = useSelector(uiSelectors.getChatOpened);

  const changeLanguage = (lng: string) => {
    console.log(lng);
    setSelectedModel(lng);
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    fetchUser(dispatch);
  }, [dispatch]);

  useEffect(() => {
    fetchMessages(dispatch, currentChatId);
  }, [currentChatId, dispatch]);

  return (
    <SidebarProvider
      open
      style={
        {
          "--sidebar-width-mobile": "20rem",
          "--sidebar-width": "20rem",
        } as unknown as CSSProperties
      }
    >
      <AppSidebar />
      <div
        className={cn(
          "flex justify-between m-auto relative z-[1000] bg-white p-8 text-[20px]",
          "flex-col",
          "h-full",
          "w-[60%] max-lg:w-[80%] max-md:w-[100%]"
        )}
      >
        <div className={cn("flex", "justify-end", "mb-2", "w-full")}>
          <div className={cn("flex", "justify-end", "mb-2")}>
            <Select value={selectedModel} onValueChange={changeLanguage}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent className="top-4">
                {LANGUAGES.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {(requests["messages"] === "pending" ||
          requests["chats"] === "pending") && (
          <div className="flex-1 m-auto">
            <Loader />
          </div>
        )}
        {requests["messages"] !== "pending" &&
          requests["chats"] !== "pending" && (
            <Chat
              className="grow"
              messages={messages.map(({ id, role, message }) => ({
                id,
                role,
                content: message,
              }))}
              handleSubmit={handleSubmit}
              isGenerating={isLoading}
              stop={stop}
              append={append}
              setMessages={setMessages}
              transcribeAudio={transcribeAudio}
              suggestions={[
                t("suggestion1"),
                t("suggestion2"),
                t("suggestion3"),
                t("suggestion4"),
              ]}
            />
          )}
      </div>
    </SidebarProvider>
  );
}
