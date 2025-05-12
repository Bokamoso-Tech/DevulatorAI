import { ProjectRequirement, ProjectPlan } from "../../client/src/types";
import { generateWithFunctionCalling } from "../openai";
import { createProjectPlanPrompt, projectPlanSchema } from "./prompts";

// Function to generate a local project plan without relying on OpenAI
function generateLocalProjectPlan(projectRequirement: ProjectRequirement): ProjectPlan {
  const today = new Date();
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Create start date (today)
  const startDate = formatDate(today);
  
  // Create a date 8 months from now
  const endDate = new Date(today);
  endDate.setMonth(today.getMonth() + 8);
  
  // Create milestone dates at regular intervals
  const milestone1Date = new Date(today);
  milestone1Date.setMonth(today.getMonth() + 2);
  
  const milestone2Date = new Date(today);
  milestone2Date.setMonth(today.getMonth() + 4);
  
  const milestone3Date = new Date(today);
  milestone3Date.setMonth(today.getMonth() + 6);
  
  return {
    projectName: projectRequirement.name || "Software Development Project",
    projectType: "Custom Software Development",
    industry: projectRequirement.industry || "Technology",
    duration: "8 months",
    startDate: startDate,
    estimatedCost: "R750,000 - R850,000",
    milestones: [
      {
        name: "Planning and Analysis Phase",
        description: "Requirements gathering, system architecture design, and project planning",
        targetDate: formatDate(milestone1Date),
        progress: 0
      },
      {
        name: "Development Phase",
        description: "Core functionality implementation, database setup, and API development",
        targetDate: formatDate(milestone2Date),
        progress: 0
      },
      {
        name: "Testing and Quality Assurance",
        description: "Functional testing, performance testing, and bug fixing",
        targetDate: formatDate(milestone3Date),
        progress: 0
      },
      {
        name: "Deployment and Handover",
        description: "Production deployment, user training, and documentation",
        targetDate: formatDate(endDate),
        progress: 0
      }
    ],
    resourceAllocation: [
      {
        role: "Project Manager",
        allocation: "15%",
        notes: "Responsible for overall project coordination and stakeholder communication"
      },
      {
        role: "Business Analyst",
        allocation: "10%",
        notes: "Requirements analysis and documentation"
      },
      {
        role: "UI/UX Designer",
        allocation: "10%",
        notes: "User interface design and user experience optimization"
      },
      {
        role: "Frontend Developer",
        allocation: "20%",
        notes: "Implementation of user interfaces and client-side functionality"
      },
      {
        role: "Backend Developer",
        allocation: "25%",
        notes: "Server-side logic and API development"
      },
      {
        role: "QA Engineer",
        allocation: "10%",
        notes: "Quality assurance and testing"
      },
      {
        role: "DevOps Engineer",
        allocation: "5%",
        notes: "Deployment pipeline and infrastructure management"
      },
      {
        role: "Security Specialist",
        allocation: "5%",
        notes: "Security assessment and implementation of security measures"
      }
    ],
    riskAssessment: [
      {
        category: "Technical",
        probability: "Medium",
        impact: "High",
        mitigationStrategy: "Regular technical reviews and continuous integration"
      },
      {
        category: "Resource",
        probability: "Medium",
        impact: "Medium",
        mitigationStrategy: "Cross-training team members and maintaining a resource buffer"
      },
      {
        category: "Schedule",
        probability: "High",
        impact: "Medium",
        mitigationStrategy: "Regular progress tracking and adjustment of timelines as needed"
      },
      {
        category: "Budget",
        probability: "Medium",
        impact: "High",
        mitigationStrategy: "Regular budget reviews and maintaining a contingency fund"
      },
      {
        category: "Scope",
        probability: "High", 
        impact: "Medium",
        mitigationStrategy: "Clear requirements documentation and change control process"
      }
    ]
  };
}

export async function generateProjectPlan(projectRequirement: ProjectRequirement): Promise<{data: ProjectPlan, usedFallback: boolean}> {
  try {
    console.log("Generating project plan for:", projectRequirement.name);
    
    // Generate the prompt
    const prompt = createProjectPlanPrompt(projectRequirement);
    
    try {
      // Try to call OpenAI with function calling
      const result = await generateWithFunctionCalling<ProjectPlan>(
        prompt,
        projectPlanSchema,
        "generate_project_plan"
      );
      
      return { data: result, usedFallback: false };
    } catch (aiError) {
      console.error("Error calling OpenAI API, falling back to local generation:", aiError);
      
      // If OpenAI fails, use the local generator as a fallback
      console.log("Using local project plan generator as fallback");
      return { data: generateLocalProjectPlan(projectRequirement), usedFallback: true };
    }
  } catch (error) {
    console.error("Error generating project plan:", error);
    
    // Final fallback if even the local generator fails
    console.log("All generation attempts failed, using emergency fallback");
    return { data: generateLocalProjectPlan(projectRequirement), usedFallback: true };
  }
}
