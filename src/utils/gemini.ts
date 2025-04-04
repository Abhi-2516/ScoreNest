export const generateGeminiResponse = async (prompt: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
    // Updated prompt for concise response
    const concisePrompt = `Answer the following query concisely in a short paragraph. Use bullet points only if necessary. Avoid markdown formatting:\n\n${prompt}`;
  
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: concisePrompt }],
          },
        ],
      }),
    });
  
    const data = await res.json();
  
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const rawText = data.candidates[0].content.parts[0].text;
  
      // Clean markdown-like formatting:
      const cleanedText = rawText
        .replace(/^\s*[\*\-]\s*/gm, "- ")     // Convert * or - bullets to dash
        .replace(/\*\*(.*?)\*\*/g, "$1")     // Remove bold
        .replace(/\*(.*?)\*/g, "$1");        // Remove italics
  
      return cleanedText;
    }
  
    throw new Error("Failed to fetch Gemini response.");
  };
  