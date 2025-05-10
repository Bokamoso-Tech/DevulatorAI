import { ProjectRequirement, ProjectPlan, FeasibilityStudy, RfpDocument } from "../../client/src/types";
import { generateWithFunctionCalling } from "../openai";
import { createRfpDocumentPrompt, rfpDocumentSchema } from "./prompts";

export async function generateRfpDocument(
  projectRequirement: ProjectRequirement,
  projectPlan: ProjectPlan,
  feasibilityStudy: FeasibilityStudy,
  documentType: string = "standard"
): Promise<RfpDocument> {
  try {
    // Generate the prompt
    const prompt = createRfpDocumentPrompt(
      projectRequirement,
      projectPlan,
      feasibilityStudy,
      documentType
    );
    
    // Call OpenAI with function calling
    const result = await generateWithFunctionCalling<RfpDocument>(
      prompt,
      rfpDocumentSchema,
      "generate_rfp_document"
    );
    
    return result;
  } catch (error) {
    console.error("Error generating RFP document:", error);
    throw new Error("Failed to generate RFP document. Please try again.");
  }
}
