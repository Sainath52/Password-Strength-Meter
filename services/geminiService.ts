
import { GoogleGenAI, Type } from "@google/genai";

interface GeneratedPassword {
    password: string;
    hint: string;
}

// Ensure the API key is available
if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generatePassword = async (prompt: string): Promise<GeneratedPassword> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a secure password based on this prompt: "${prompt}"`,
            config: {
                systemInstruction: `You are a secure password generator. Your goal is to create a strong, unique, and memorable password based on the user's prompt. The password MUST be between 16 and 24 characters long. It MUST include a mix of uppercase letters, lowercase letters, numbers, and special characters from this set: !@#$%^&*(). Do not use other special characters. Provide the password and a short, clever hint for remembering it.`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        password: {
                            type: Type.STRING,
                            description: "The generated secure password."
                        },
                        hint: {
                            type: Type.STRING,
                            description: "A short, clever hint for remembering the password."
                        }
                    },
                    required: ["password", "hint"]
                },
                temperature: 1.0, // Increase creativity for more random passwords
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse: GeneratedPassword = JSON.parse(jsonText);

        if (!parsedResponse.password) {
            throw new Error("API returned an invalid password format.");
        }
        
        return parsedResponse;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate password. Please try again.");
    }
};
