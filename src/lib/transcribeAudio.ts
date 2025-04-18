/**
 * Sends audio to a backend API for transcription (e.g., OpenAI Whisper).
 * You'll need to implement the API endpoint (/api/transcribe) separately.
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append("file", audioBlob, "recording.webm");

  try {
    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.statusText}`);
    }

    const { text } = await response.json();
    return text;
  } catch (error) {
    console.error("Transcription error:", error);
    throw error;
  }
};
