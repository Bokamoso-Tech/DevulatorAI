// Configure the Azure OpenAI client
/* const API_URL = process.env.AZURE_OPENAI_ENDPOINT || "";
const API_KEY = process.env.AZURE_OPENAI_API_KEY || "";
// Override API_MODEL with the correct deployment name "o3-mini-2"
const API_MODEL = "o3-mini-2"; // Using the correct deployment name instead of environment variable
const API_VERSION = process.env.AZURE_OPENAI_API_VERSION || "2023-05-15";

if (!API_URL || !API_KEY) {
  console.error("Azure OpenAI credentials not configured properly!");
  console.error("API_URL:", API_URL ? "Set" : "Missing");
  console.error("API_KEY:", API_KEY ? "Set" : "Missing");
  console.error("API_VERSION:", API_VERSION);
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
//const API_MODEL = "o3-mini-2";
//const API_VERSION = "2024-12-01-preview";
const API_MODEL   = process.env.AZURE_OPENAI_MODEL      || "o3-mini-2";
const API_VERSION = process.env.AZURE_OPENAI_API_VERSION || "2024-12-01-preview";

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
            "You are an expert Senior Software Engineer and business analyst specializing in South African software development projects. Your task is to create detailed, accurate project plans, cost estimates, feasibility studies, and RFP documents that comply with South African standards and regulations. Pull information from reputable sources regarding pricing of software projects in South Africa and how engineers, project managers and designers are paid. Use sources like Specno and offerzen.Ensure that you estimate a cost in the project plan and not simply use the budget range the user has provided.                                                                                                   On the project milestones table:                                           1.Ensure the target dates cannot be before current date(All the dates must be at least a month after May 31, 2025. Make sure sure you check the calendar for accuracy and that the work only takes place during the work week(Monday to Friday).                                                                      2.The description of the milestones should be very specific to each project. Go into deep details regarding the description. You should include specics regarding what architecture is best for that specific system or application. This should depend on factors like expected number of users(scalability), security and other factors. Include the best tech for the specific app/system.(An internal system would probaly have a different architecture and stack as compared to a consumer app or enterprise sytem). Ensure that the different user roles are considered and what they will likely do on a specific app. Write the separate points in bullet point form.Where one point ends, go to new line.                                  3.The duration of each milestone should also be based on the specifi project. Milestones will not necessarily take the same amount of time. Analyse the individual project from the user input and use Software engineering and software architect and project manage knowledge to determine how long each milestone will take. Some will take 2 weeks and some will take up to a month                     4. The progress bar needs to be filled according to the percentage of the total time it will take to achive each milestone. e.g. If a milestone takes 4 out of 8 weeks to achieve then the progress bar will be filled up to 50%. The progress bars must be incremental.e.g  If the first project bar says 7% and the next milestone takes 14% of the total time then the progress bar that comes next should 21% (7%+14%)                                                                                                                                                 On the risk assessment table:                                                     1.Ensure that the probability for each Risk category is accurate and thoroughly analysed.                                                                          On Resource Allocation table:                                                      1. The Allocation should be a precentage of the total time each resource will take working on the project e.g If a QA engineer will have to work 4 out of 8 weeks, then the allocation will be 50%. In the end the total percentages should all add up to 100%.                                                                                                                                                 Feasibility:                                                                         On the technical feasibility table:                                               1. Ensure that the technical feasibility score is not generic but, rather            specific to the project after thorough, deep technical analysis.               2. All posible technical factors should be analysed, not just stack and              architecture. These factors are: Technology Stack, Integration Complexity,        Technical Expertise Required, Scalability, Security Requirements. Go to a         new line after analysing each factor. The total feasiblity score should be        an average of the individual scores of the factors.                                                                                                              On Financial feasiblity table:                                                    1. The financial feasibility score has to be specific to the project after           thorough and deep financial analysis.	.                                        2. The projected ROI should be based on thorough analysis and sound financial        modelling of high quality. The payback period should also be based on deep        analysis that is specific to the project.                                      3. All posible financial factors should be analysed, not just stack and              architecture. These factors are: Budget Adequacy, Return on Investment,           Cost Certainty, Funding Availability, Financial Risk . Go to a new line           after analysing each factor. The total feasiblity score should be an              average of the individual scores of the factors. The financial feasibility        score bar shold reflect this. It MUST be an average of the individual             factors e.g If the individual factors have the following scores:75%, 65%,         70%, 80%, 60%, then the average shold be 70%  ,              ",
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
    console.log("Response data:", JSON.stringify(data, null, 2));

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
