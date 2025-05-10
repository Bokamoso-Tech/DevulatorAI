import { ProjectRequirement, ProjectPlan } from "../../client/src/types";
import { generateWithFunctionCalling } from "../openai";
import { createProjectPlanPrompt, projectPlanSchema } from "./prompts";

export async function generateProjectPlan(projectRequirement: ProjectRequirement): Promise<ProjectPlan> {
  try {
    // Generate the prompt
    const prompt = createProjectPlanPrompt(projectRequirement);
    
    // Call OpenAI with function calling
    const result = await generateWithFunctionCalling<ProjectPlan>(
      prompt,
      projectPlanSchema,
      "generate_project_plan"
    );
    
    return result;
  } catch (error) {
    console.error("Error generating project plan:", error);
    throw new Error("Failed to generate project plan. Please try again.");
  }
}
