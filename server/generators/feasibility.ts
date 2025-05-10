import { ProjectRequirement, ProjectPlan, FeasibilityStudy } from "../../client/src/types";
import { generateWithFunctionCalling } from "../openai";
import { createFeasibilityStudyPrompt, feasibilityStudySchema } from "./prompts";

export async function generateFeasibilityStudy(
  projectRequirement: ProjectRequirement,
  projectPlan: ProjectPlan
): Promise<FeasibilityStudy> {
  try {
    // Generate the prompt
    const prompt = createFeasibilityStudyPrompt(projectRequirement, projectPlan);
    
    // Call OpenAI with function calling
    const result = await generateWithFunctionCalling<FeasibilityStudy>(
      prompt,
      feasibilityStudySchema,
      "generate_feasibility_study"
    );
    
    return result;
  } catch (error) {
    console.error("Error generating feasibility study:", error);
    throw new Error("Failed to generate feasibility study. Please try again.");
  }
}
