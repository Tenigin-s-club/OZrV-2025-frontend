import { useState } from "react";
import { useChat, type UseChatOptions } from "@ai-sdk/react";

import { cn } from "@/lib/utils";
// import { transcribeAudio } from "@/lib/utils/audio";
import { Chat } from "@/components/ui/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MODELS = [
  { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B" },
  { id: "deepseek-r1-distill-llama-70b", name: "Deepseek R1 70B" },
];

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatBot(props: ChatDemoProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
    setMessages,
  } = useChat({
    ...props,
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
  });

  return (
    <div
      className={cn(
        "flex absolute z-[1000] bg-white p-8 text-[20px]",
        "flex-col",
        "h-full",
        "w-full"
      )}
    >
      {/* <div className={cn("flex", "justify-end", "mb-2")}>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[18%]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        setMessages={setMessages}
        // transcribeAudio={transcribeAudio}
        suggestions={[
          "Привет, я хочу написать обращение",
          "Хочу сообщить о проблеме",
          "Посмотреть реестр домов",
          "Хочу ознакомиться со всеми домами на ФТ",
        ]}
      />
    </div>
  );
}
