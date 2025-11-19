import { GoogleGenAI } from "@google/genai";
import { QuizState } from "../types";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API Key not found");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const generateRelocationAdvice = async (data: QuizState): Promise<string> => {
    const client = getClient();
    if (!client) return "Unable to connect to AI service. Please check API key.";

    const prompt = `
    You are an expert global relocation strategist for startups called "NextBot".
    A user has just completed a relocation quiz. Provide a brief, high-level initial impression and strategy teaser based on their profile.
    Keep it encouraging, professional, and concise (under 150 words).

    User Profile:
    - Type: ${data.userType}
    - Target Markets: ${data.markets.join(', ')}
    - Business Stage: ${data.stage}
    - Funding/Revenue: ${data.funding}
    - Team Size: ${data.teamSize}
    - Citizenship: ${data.citizenship}
    - Residence: ${data.residence}

    Address them by name: ${data.name}.
    Focus on why their specific combination of stage/funding and target market is exciting, and hint at a specific visa pathway that might be relevant (e.g., O-1 for funded US, SUV for Canada, Innovator for UK).
    End by confirming that a detailed report is being generated.
    `;

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Thank you. Your profile is being analyzed.";
    } catch (error) {
        console.error("Gemini API error:", error);
        return "We have received your details. Our strategists are reviewing your profile now.";
    }
};
