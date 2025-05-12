// Configure the Azure OpenAI client
const API_URL = process.env.AZURE_OPENAI_ENDPOINT || "";
const API_KEY = process.env.AZURE_OPENAI_API_KEY || "";
// Override API_MODEL with the correct deployment name "o3-mini-2"
const API_MODEL = "o3-mini-2"; // Using the correct deployment name instead of environment variable
const API_VERSION = process.env.AZURE_OPENAI_API_VERSION || "2023-05-15";

if (!API_URL || !API_KEY) {
  console.error("Azure OpenAI credentials not configured properly!");
}

export async function generateCompletion(prompt: string, maxTokens: number = 4000): Promise<string> {
  try {
    console.log(`Using Azure OpenAI deployment: ${API_MODEL}`);
    
    const response = await fetch(`${API_URL}/openai/deployments/${API_MODEL}/chat/completions?api-version=${API_VERSION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are an expert Senior Software Engineer and business analyst specializing in South African software development projects. Your task is to create detailed, accurate project plans, cost estimates, feasibility studies, and RFP documents that comply with South African standards and regulations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Azure OpenAI API error: ${response.status} ${text}`);
      throw new Error(`Azure OpenAI API error: ${response.status} ${text}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating Azure OpenAI completion:", error);
    throw new Error("Failed to generate content. Please try again later.");
  }
}

export async function generateWithFunctionCalling<T>(
  prompt: string, 
  schema: any, 
  functionName: string
): Promise<T> {
  try {
    console.log(`Using Azure OpenAI deployment: ${API_MODEL} for function calling`);
    
    const response = await fetch(`${API_URL}/openai/deployments/${API_MODEL}/chat/completions?api-version=${API_VERSION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are an expert Senior Software Engineer and business analyst specializing in South African software development projects. Your task is to create detailed, accurate project plans, cost estimates, feasibility studies, and RFP documents that comply with South African standards and regulations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        functions: [
          {
            name: functionName,
            parameters: schema
          }
        ],
        function_call: { name: functionName },
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Azure OpenAI API error: ${response.status} ${text}`);
      throw new Error(`Azure OpenAI API error: ${response.status} ${text}`);
    }

    const data = await response.json();
    const functionCall = data.choices[0].message.function_call;
    
    if (!functionCall || !functionCall.arguments) {
      throw new Error("No valid function call returned from OpenAI");
    }
    
    const parsedArguments = JSON.parse(functionCall.arguments);
    return parsedArguments as T;
  } catch (error) {
    console.error("Error using Azure OpenAI function calling:", error);
    throw new Error("Failed to generate structured content. Please try again later.");
  }
}
