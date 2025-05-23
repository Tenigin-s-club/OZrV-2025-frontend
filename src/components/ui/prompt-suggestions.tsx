interface PromptSuggestionsProps {
  label: string;
  append: (message: { role: "user"; content: string }) => void;
  suggestions: string[];
}

export function PromptSuggestions({
  label,
  append,
  suggestions,
}: PromptSuggestionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center">
        <div className="size-20  z-[1000] ">
          <img className="size-20 object-contain" src="/logo_fun.PNG" />
        </div>
        <h2 className="text-center text-2xl font-bold">{label}</h2>
      </div>
      <div className="flex gap-6 text-sm flex-wrap max-sm:gap-3 ">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className="min-w-40 h-max max-sm:w-full flex-1 rounded-xl border bg-background p-4 hover:bg-muted"
          >
            <p>{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
