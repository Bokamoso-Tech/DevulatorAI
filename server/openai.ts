// Configure the Azure OpenAI client
/* const API_URL = process.env.AZURE_OPENAI_ENDPOINT || "";
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
} */

// Configure the Azure OpenAI client
const API_URL = process.env.AZURE_OPENAI_ENDPOINT || "";
const API_KEY = process.env.AZURE_OPENAI_API_KEY || "";
const API_MODEL = "o3-mini";
const API_VERSION = "2024-12-01-preview";

if (!API_URL || !API_KEY) {
  console.error(
    "Azure OpenAI credentials not configured properly! Please check your environment variables.",
  );
}

export async function generateCompletion(
  prompt: string,
  maxTokens: number = 4000,
): Promise<string> {
  try {
    console.log(`Sending request to Azure OpenAI deployment: ${API_MODEL}`);
    console.log(`API endpoint: ${API_URL}`);
    console.log(`Using API version: ${API_VERSION}`);

    const apiUrl = `${API_URL}/openai/deployments/${API_MODEL}/chat/completions?api-version=${API_VERSION}`;
    console.log(`Full API URL: ${apiUrl}`);

    const payload = {
      messages: [
        {
          role: "system",
          content:
            "You are an expert Senior Software Engineer and business analyst specializing in South African software development projects. Your task is to create detailed, accurate project plans, cost estimates, feasibility studies, and RFP documents that comply with South African standards and regulations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    };

    console.log(
      "Sending request with payload:",
      JSON.stringify(payload, null, 2),
    );

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Azure OpenAI API error: Status ${response.status}`);
      console.error(`Response body: ${text}`);
      throw new Error(`Azure OpenAI API error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    console.log("Received successful response from Azure OpenAI");

    if (
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      console.error(
        "Unexpected response structure:",
        JSON.stringify(data, null, 2),
      );
      throw new Error("Unexpected response structure from Azure OpenAI");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating Azure OpenAI completion:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate content: ${error.message}`);
    } else {
      throw new Error("Failed to generate content: Unknown error");
    }
  }
}

export async function generateWithFunctionCalling<T>(
  prompt: string,
  schema: any,
  functionName: string,
): Promise<T> {
  try {
    console.log(
      `Using Azure OpenAI deployment: ${API_MODEL} for function calling`,
    );
    console.log(`API endpoint: ${API_URL}`);
    console.log(`Using API version: ${API_VERSION}`);

    const apiUrl = `${API_URL}/openai/deployments/${API_MODEL}/chat/completions?api-version=${API_VERSION}`;
    console.log(`Full API URL: ${apiUrl}`);

    const payload = {
      messages: [
        {
          role: "system",
          content:
            "You are an expert Senior Software Engineer and business analyst specializing in South African software development projects. Your task is to create detailed, accurate project plans, cost estimates, feasibility studies, and RFP documents that comply with South African standards and regulations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      functions: [
        {
          name: functionName,
          parameters: schema,
        },
      ],
      function_call: { name: functionName },
      temperature: 0.7,
    };

    console.log(
      "Sending function calling request with payload:",
      JSON.stringify(payload, null, 2),
    );

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Azure OpenAI API error: Status ${response.status}`);
      console.error(`Response body: ${text}`);
      throw new Error(`Azure OpenAI API error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    console.log(
      "Received successful response from Azure OpenAI function calling",
    );

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error(
        "Unexpected response structure:",
        JSON.stringify(data, null, 2),
      );
      throw new Error("Unexpected response structure from Azure OpenAI");
    }

    const functionCall = data.choices[0].message.function_call;

    if (!functionCall || !functionCall.arguments) {
      console.error(
        "No valid function call in response:",
        JSON.stringify(data.choices[0], null, 2),
      );
      throw new Error("No valid function call returned from Azure OpenAI");
    }

    try {
      const parsedArguments = JSON.parse(functionCall.arguments);
      return parsedArguments as T;
    } catch (parseError) {
      console.error(
        "Failed to parse function arguments:",
        functionCall.arguments,
      );
      if (parseError instanceof Error) {
        throw new Error(
          `Failed to parse function arguments: ${parseError.message}`,
        );
      } else {
        throw new Error("Failed to parse function arguments: Unknown error");
      }
    }
  } catch (error) {
    console.error("Error using Azure OpenAI function calling:", error);
    if (error instanceof Error) {
      throw new Error(
        `Failed to generate structured content: ${error.message}`,
      );
    } else {
      throw new Error("Failed to generate structured content: Unknown error");
    }
  }
}

export async function testAzureOpenAIConnection(): Promise<boolean> {
  try {
    console.log("Testing connection to Azure OpenAI...");
    const result = await generateCompletion(
      "Hello, this is a test message to verify connectivity.",
      10,
    );
    console.log("Connection test successful!");
    return true;
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
}
