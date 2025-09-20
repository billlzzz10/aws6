
import { GoogleGenAI, GenerateContentResponse, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { ChatTurn } from '../../../types';
import { MODEL_NAME as DEFAULT_MODEL_NAME } from '../constants';

const STREAM_ERROR_MARKER_FRONTEND = "[[STREAM_ERROR_SDK]]";
const STREAM_ERROR_MARKER_BACKEND = "[[STREAM_ERROR]]"; // Marker used by the backend

const getApiBaseUrl = () => {
  return (process.env.REACT_APP_BACKEND_API_URL || '/api');
};

const formatGeminiErrorForFrontend = (error: any, operationName: string, modelUsed: string): string => {
    console.error(`[Frontend Gemini SDK Error - ${operationName} - Model: ${modelUsed}]`, error);
    let message = "เกิดข้อผิดพลาดในการติดต่อกับ Gemini API โดยตรงจาก Frontend";
    if (error && typeof error === 'object') {
        if (error.message) {
            message = error.message;
        }
        // Specific check for safety-related blocks or other structured errors
        // This part might need adjustment based on actual error structures from the SDK
        if (error.toString && error.toString().includes("blocked")) {
            message = "เนื้อหาที่ร้องขอถูกบล็อกเนื่องจากนโยบายความปลอดภัย";
        }
    } else if (typeof error === 'string') {
        message = error;
    }

    if (message.toLowerCase().includes("api key not valid") || message.toLowerCase().includes("permission_denied") || message.toLowerCase().includes("api_key_invalid")) {
        return `AI Error (Frontend SDK): API Key ที่ใช้ (${modelUsed}) ไม่ถูกต้องหรือไม่มีสิทธิ์การเข้าถึง`;
    }
    return `AI Error (Frontend SDK - ${modelUsed}): ${message}`;
};


export async function* generateAiContentStream(
  systemInstruction: string,
  userPrompt: string,
  chatHistory?: ChatTurn[],
  customApiKey?: string,
  selectedModel?: string
): AsyncGenerator<string, void, undefined> {
  const modelToUse = selectedModel || DEFAULT_MODEL_NAME;

  if (customApiKey) {
    // Use direct SDK call
    try {
      const ai = new GoogleGenAI({ apiKey: customApiKey });
      const contents = [];
      if (chatHistory && chatHistory.length > 0) {
        chatHistory.forEach(turn => {
          if ((turn.role === 'user' || turn.role === 'model') && turn.text) {
            contents.push({ role: turn.role, parts: [{ text: turn.text }] });
          }
        });
      }
      contents.push({ role: 'user', parts: [{ text: userPrompt }] });
      
      const config: any = {
        safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ]
      };
      if (systemInstruction && systemInstruction.trim() !== '') {
        config.systemInstruction = systemInstruction;
      }
      // For general content generation, omit thinkingConfig to use default (enabled thinking for higher quality)
      // if (modelToUse === 'gemini-2.5-flash-preview-04-17') {
      //   config.thinkingConfig = { thinkingBudget: 0 }; // Example: disable for flash if needed for low latency
      // }


      const responseStream = await ai.models.generateContentStream({ model: modelToUse, contents, config });

      for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        if (typeof chunkText === 'string') {
          yield chunkText;
        }
      }
    } catch (error: any) {
      const formattedError = formatGeminiErrorForFrontend(error, 'generateAiContentStream (SDK)', modelToUse);
      yield `${STREAM_ERROR_MARKER_FRONTEND}<p class="text-red-400 font-semibold">${formattedError}</p>`;
    }
    return;
  } else {
    // Fallback to backend API call
    const apiBaseUrl = getApiBaseUrl();
    try {
      const response = await fetch(`${apiBaseUrl}/ai/generate-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemInstruction, userPrompt, chatHistory, selectedModel: modelToUse, customApiKey }), // customApiKey will be undefined here
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes(STREAM_ERROR_MARKER_BACKEND) || errorText.includes(STREAM_ERROR_MARKER_FRONTEND)) {
           yield errorText;
        } else {
          yield `${STREAM_ERROR_MARKER_FRONTEND}<p class="text-red-400 font-semibold">Error from backend: ${response.status} ${response.statusText}. Details: ${errorText}</p>`;
        }
        return;
      }
      if (!response.body) {
        yield `${STREAM_ERROR_MARKER_FRONTEND}<p class="text-red-400 font-semibold">No response body from backend stream.</p>`;
        return;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.length > 0) yield buffer;
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        if (buffer.includes(STREAM_ERROR_MARKER_BACKEND) || buffer.includes(STREAM_ERROR_MARKER_FRONTEND)) {
          yield buffer; return;
        }
        yield buffer; buffer = '';
      }
    } catch (error: any) {
      console.error("[Frontend AI Service Error - generateAiContentStream (Backend Call)]", error);
      yield `${STREAM_ERROR_MARKER_FRONTEND}<p class="text-red-400 font-semibold">Network or parsing error (Backend Call): ${error.message}</p>`;
    }
  }
}

export const generateSubtasksForTask = async (
  taskTitle: string,
  taskCategory: string,
  customApiKey?: string,
  selectedModel?: string
): Promise<string[]> => {
  const modelToUse = selectedModel || DEFAULT_MODEL_NAME;

  if (customApiKey) {
    // Use direct SDK call
    try {
      const ai = new GoogleGenAI({ apiKey: customApiKey });
      const systemInstruction = "คุณคือ AI ผู้ช่วยในการจัดการงานที่มีประสิทธิภาพ หน้าที่ของคุณคือช่วยผู้ใช้แบ่งงานหลักออกเป็นงานย่อยๆ ที่สามารถดำเนินการได้ เมื่อได้รับชื่อของงานหลักและประเภทของงาน โปรดสร้างรายการงานย่อย 3-5 รายการที่ชัดเจนและกระชับ แต่ละงานย่อยควรเป็นขั้นตอนที่นำไปสู่การทำงานหลักให้สำเร็จลุล่วง ตอบกลับเป็น JSON array ของสตริงเท่านั้น โดยแต่ละสตริงคืองานย่อยหนึ่งรายการ อย่าใส่คำอธิบายใดๆ นอกเหนือจาก JSON array และไม่ต้องมี Markdown code fences (```json ... ```)";
      const userPromptText = `ชื่องานหลัก: "${taskTitle}"\nประเภท: "${taskCategory || 'ทั่วไป'}"\n\nกรุณาสร้างงานย่อยเป็น JSON array ของสตริง`;
      
      const config: any = {
        systemInstruction,
        responseMimeType: "application/json",
        safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ]
      };
      if (modelToUse === 'gemini-2.5-flash-preview-04-17') {
        config.thinkingConfig = { thinkingBudget: 0 }; // Disable thinking for subtask generation (low latency)
      }

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelToUse,
        contents: [{ role: 'user', parts: [{ text: userPromptText }] }],
        config,
      });

      let jsonStr = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }

      try {
        const subtasks = JSON.parse(jsonStr);
        if (!Array.isArray(subtasks) || !subtasks.every(s => typeof s === 'string')) {
          console.error(`Frontend SDK AI response for subtasks (model: ${modelToUse}) was not a valid JSON array of strings. Parsed:`, subtasks);
          alert(`AI (Frontend SDK - ${modelToUse}) ส่งผลลัพธ์งานย่อยในรูปแบบที่ไม่ถูกต้อง: ${response.text}`);
          return [];
        }
        return subtasks;
      } catch (e) {
        console.error(`Frontend SDK failed to parse JSON subtasks from AI (model: ${modelToUse}). Raw:`, response.text, "Attempted to parse:", jsonStr);
        alert(`ไม่สามารถแยกวิเคราะห์ JSON จาก AI (Frontend SDK - ${modelToUse}): ${response.text}`);
        return [];
      }
    } catch (error: any) {
      const formattedError = formatGeminiErrorForFrontend(error, 'generateSubtasksForTask (SDK)', modelToUse);
      alert(formattedError);
      return [];
    }
  } else {
    // Fallback to backend API call
    const apiBaseUrl = getApiBaseUrl();
    try {
      const response = await fetch(`${apiBaseUrl}/ai/generate-subtasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskTitle, taskCategory, selectedModel: modelToUse, customApiKey }), // customApiKey will be undefined
      });

      if (!response.ok) {
        let errorDetails = `Error ${response.status}: ${response.statusText}`;
        try { const errorData = await response.json(); errorDetails = errorData.error || errorData.message || errorDetails; if(errorData.details) errorDetails += ` Details: ${errorData.details}`; } catch (e) { try { const textError = await response.text(); errorDetails = textError || errorDetails; } catch (textE) {} }
        alert(`ไม่สามารถสร้างงานย่อยได้ (Backend Error): ${errorDetails}`);
        return [];
      }
      const subtasks = await response.json();
      if (!Array.isArray(subtasks) || !subtasks.every(s => typeof s === 'string')) {
        console.error(`AI response for subtasks from backend was not a valid JSON array of strings. Parsed:`, subtasks);
        alert("AI (ผ่าน Backend) ส่งผลลัพธ์งานย่อยในรูปแบบที่ไม่ถูกต้อง");
        return [];
      }
      return subtasks;
    } catch (error: any) {
      console.error("[Frontend AI Service Error - generateSubtasksForTask (Backend Call)]", error);
      alert(`ไม่สามารถสร้างงานย่อยได้ (Network Error - Backend Call): ${error.message}`);
      return [];
    }
  }
};
