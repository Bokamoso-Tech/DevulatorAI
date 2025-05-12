import { ProjectRequirement, ProjectPlan, FeasibilityStudy, RfpDocument, RfpSection } from "../../client/src/types";
import { generateWithFunctionCalling } from "../openai";
import { createRfpDocumentPrompt, rfpDocumentSchema } from "./prompts";

// Function to generate a local RFP document without relying on OpenAI
function generateLocalRfpDocument(
  projectRequirement: ProjectRequirement,
  projectPlan: ProjectPlan,
  feasibilityStudy: FeasibilityStudy,
  documentType: string = "standard"
): RfpDocument {
  
  // Create RFP sections based on project requirement and plan
  const sections: RfpSection[] = [
    {
      title: "1. Introduction",
      content: `This Request for Proposal (RFP) is issued by ${projectRequirement.company || "Company Name"} to solicit proposals from qualified vendors for the development of ${projectRequirement.name || "the described software solution"}. This document outlines our requirements, evaluation criteria, and submission guidelines.`,
      subsections: [
        {
          title: "1.1 Company Background",
          content: `${projectRequirement.company || "Our company"} is a leader in the ${projectRequirement.industry || "specified"} industry, seeking to implement a new software solution to address specific business needs.`
        },
        {
          title: "1.2 Project Overview",
          content: `${projectRequirement.objective || "The objective of this project is to develop a software solution that addresses our business needs."} The estimated timeline for completion is ${projectPlan.duration || "as specified in the project plan"}.`
        }
      ]
    },
    {
      title: "2. Requirements Specification",
      content: "The following requirements must be addressed in any proposal submitted in response to this RFP:",
      subsections: [
        {
          title: "2.1 Problem Statement",
          content: projectRequirement.problemStatement || "The current business problem that needs to be addressed."
        },
        {
          title: "2.2 Functional Requirements",
          content: `Key features to be implemented include: ${projectRequirement.keyFeatures || "features as described in earlier documentation"}.`
        },
        {
          title: "2.3 Technical Requirements",
          content: `The solution should be developed using ${projectRequirement.preferredTechnologies || "appropriate technologies for the described requirements"}. Security and performance considerations must be adequately addressed.`
        },
        {
          title: "2.4 Compliance Requirements",
          content: projectRequirement.complianceRequirements || "The solution must comply with all relevant South African laws and regulations pertaining to data protection and privacy."
        }
      ]
    },
    {
      title: "3. Project Scope",
      content: "The scope of this project includes the following components and deliverables:",
      subsections: [
        {
          title: "3.1 Deliverables",
          content: `The project will deliver: 
          - Complete software solution meeting all specified requirements
          - User documentation and training materials
          - Source code and technical documentation
          - Implementation support and knowledge transfer`
        },
        {
          title: "3.2 Milestones",
          content: `Key project milestones include:
          ${projectPlan.milestones.map((m, i) => `- Milestone ${i+1}: ${m.name} (${m.description})`).join('\n')}`
        },
        {
          title: "3.3 Out of Scope",
          content: "The following items are explicitly out of scope for this RFP: ongoing maintenance beyond the warranty period, hardware procurement, data migration from legacy systems unless specifically mentioned above."
        }
      ]
    },
    {
      title: "4. Budget and Timeline",
      content: `The estimated budget for this project is ${projectPlan.estimatedCost || "as specified in the project plan"} with an expected duration of ${projectPlan.duration || "as specified"}.`,
      subsections: [
        {
          title: "4.1 Payment Schedule",
          content: "Payment will be made according to the following schedule:\n- 30% upon contract signing\n- 30% upon completion of development phase\n- 30% upon user acceptance testing\n- 10% upon final delivery and acceptance"
        },
        {
          title: "4.2 Project Timeline",
          content: `The project is expected to begin on ${projectPlan.startDate || "[start date]"} with a planned duration of ${projectPlan.duration || "[duration]"}. Vendors must submit a detailed timeline as part of their proposal.`
        }
      ]
    },
    {
      title: "5. Proposal Requirements",
      content: "Vendors are required to submit comprehensive proposals addressing all aspects of this RFP:",
      subsections: [
        {
          title: "5.1 Technical Proposal",
          content: "Should include: proposed solution architecture, technology stack, development methodology, testing approach, and implementation plan."
        },
        {
          title: "5.2 Commercial Proposal",
          content: "Should include: detailed cost breakdown, payment terms, and any assumptions or exclusions."
        },
        {
          title: "5.3 Company Profile",
          content: "Should include: company background, relevant experience, team composition with roles and responsibilities, and at least three relevant references."
        }
      ]
    },
    {
      title: "6. Evaluation Criteria",
      content: "Proposals will be evaluated based on the following criteria:",
      subsections: [
        {
          title: "6.1 Technical Merit (40%)",
          content: "- Solution architecture and design\n- Technology selection\n- Methodology and approach\n- Understanding of requirements"
        },
        {
          title: "6.2 Commercial Terms (30%)",
          content: "- Total cost of ownership\n- Payment terms\n- Value for money"
        },
        {
          title: "6.3 Vendor Capability (20%)",
          content: "- Relevant experience\n- Team capabilities\n- References"
        },
        {
          title: "6.4 Implementation Plan (10%)",
          content: "- Timeline feasibility\n- Resource allocation\n- Risk management approach"
        }
      ]
    },
    {
      title: "7. Submission Process",
      content: "All interested vendors must adhere to the following submission process:",
      subsections: [
        {
          title: "7.1 Timeline",
          content: "- RFP Release Date: [Current Date]\n- Question Submission Deadline: [Current Date + 7 days]\n- Proposal Submission Deadline: [Current Date + 21 days]\n- Vendor Selection: [Current Date + 35 days]"
        },
        {
          title: "7.2 Contact Information",
          content: `All communications regarding this RFP should be directed to: ${projectRequirement.contactEmail || "[Contact Email]"}`
        }
      ]
    }
  ];
  
  return {
    documentType: documentType,
    sections: sections
  };
}

export async function generateRfpDocument(
  projectRequirement: ProjectRequirement,
  projectPlan: ProjectPlan,
  feasibilityStudy: FeasibilityStudy,
  documentType: string = "standard"
): Promise<RfpDocument> {
  try {
    console.log("Generating RFP document for:", projectRequirement.name);
    
    // Generate the prompt
    const prompt = createRfpDocumentPrompt(
      projectRequirement,
      projectPlan,
      feasibilityStudy,
      documentType
    );
    
    try {
      // Try to call OpenAI with function calling
      const result = await generateWithFunctionCalling<RfpDocument>(
        prompt,
        rfpDocumentSchema,
        "generate_rfp_document"
      );
      
      return result;
    } catch (aiError) {
      console.error("Error calling OpenAI API for RFP document, falling back to local generation:", aiError);
      
      // If OpenAI fails, use the local generator as a fallback
      console.log("Using local RFP document generator as fallback");
      return generateLocalRfpDocument(projectRequirement, projectPlan, feasibilityStudy, documentType);
    }
  } catch (error) {
    console.error("Error generating RFP document:", error);
    
    // Final fallback if even the local generator fails
    console.log("All RFP document generation attempts failed, using emergency fallback");
    return generateLocalRfpDocument(projectRequirement, projectPlan, feasibilityStudy, documentType);
  }
}
