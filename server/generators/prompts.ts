import { ProjectRequirement, ProjectPlan, FeasibilityStudy } from "../../client/src/types";

// Project Plan prompts
export function createProjectPlanPrompt(projectRequirement: ProjectRequirement): string {
  return `
Based on the following project requirements, generate a detailed project plan for a South African software development project, including milestones, resource allocation, and risk assessment.

PROJECT REQUIREMENTS:
- Project Name: ${projectRequirement.name}
- Company: ${projectRequirement.company}
- Industry: ${projectRequirement.industry}
- Problem Statement: ${projectRequirement.problemStatement}
- Objective: ${projectRequirement.objective}
- Solution Description: ${projectRequirement.solutionDescription}
- Target Users: ${projectRequirement.targetUsers}
- Key Features: ${projectRequirement.keyFeatures}
- Preferred Technologies: ${projectRequirement.preferredTechnologies || 'Not specified'}
- Compliance Requirements: ${projectRequirement.complianceRequirements || 'Standard South African compliance'}
- Budget Range: ${projectRequirement.budgetRange}
- Timeline: ${projectRequirement.timeline}

Format your response as a JSON object following this structure:
{
  "projectName": "Name of the project",
  "projectType": "Type of project (Web, Mobile, etc.)",
  "industry": "Industry",
  "duration": "Estimated duration",
  "startDate": "Proposed start date (in the format DD Month YYYY)",
  "estimatedCost": "Cost range in ZAR (e.g., R 500,000 - R 750,000)",
  "milestones": [
    {
      "name": "Milestone name (must include Project Kickoff, Requirements gathering, Design phase, Development Phase, Testing Phase, Deployment, Project closure)",
      "description": "Brief description",
      "targetDate": "Target date",
      "progress": 0
    }
  ],
  "resourceAllocation": [
    {
      "role": "Role name (must include Project Manager, Business Analyst, etc.)",
      "allocation": "Percentage allocation",
      "notes": "Additional notes"
    }
  ],
  "riskAssessment": [
    {
      "category": "Risk category (Schedule, Budget, Technical, Resources, Compliance)",
      "probability": "Probability (Low, Medium, High)",
      "impact": "Impact (Low, Medium, High)",
      "mitigationStrategy": "Detailed mitigation strategy"
    }
  ]
}

Consider South African market rates and standards for software development. Note that projects in finance and healthcare industries typically have higher costs due to compliance requirements. The milestones should be realistic for the given timeline and should include all standard phases of software development.
`;
}

// Feasibility Study prompts
export function createFeasibilityStudyPrompt(
  projectRequirement: ProjectRequirement,
  projectPlan: ProjectPlan
): string {
  return `
Based on the following project requirements and project plan, generate a comprehensive feasibility study for a South African software development project. The study should include technical, financial, and operational feasibility analysis.

PROJECT REQUIREMENTS:
- Project Name: ${projectRequirement.name}
- Company: ${projectRequirement.company}
- Industry: ${projectRequirement.industry}
- Problem Statement: ${projectRequirement.problemStatement}
- Objective: ${projectRequirement.objective}
- Solution Description: ${projectRequirement.solutionDescription}
- Target Users: ${projectRequirement.targetUsers}
- Key Features: ${projectRequirement.keyFeatures}
- Preferred Technologies: ${projectRequirement.preferredTechnologies || 'Not specified'}
- Compliance Requirements: ${projectRequirement.complianceRequirements || 'Standard South African compliance'}
- Budget Range: ${projectRequirement.budgetRange}
- Timeline: ${projectRequirement.timeline}

PROJECT PLAN:
- Project Type: ${projectPlan.projectType}
- Estimated Duration: ${projectPlan.duration}
- Estimated Cost: ${projectPlan.estimatedCost}
- Number of Milestones: ${projectPlan.milestones.length}
- Number of Resources: ${projectPlan.resourceAllocation.length}
- Identified Risks: ${projectPlan.riskAssessment.map(risk => risk.category).join(', ')}

Format your response as a JSON object following this structure:
{
  "overallScore": 67,
  "technicalScore": 68,
  "financialScore": 65,
  "operationalScore": 68,
  "recommendation": "Overall recommendation summary",
  "nextSteps": [
    "Recommended next step 1",
    "Recommended next step 2"
  ],
  "technicalFactors": [
    {
      "factor": "Factor name (Technology Stack, Integration Complexity, Technical Expertise Required, Scalability, Security Requirements)",
      "score": 80,
      "analysis": "Brief analysis",
      "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
      ]
    }
  ],
  "financialFactors": [
    {
      "factor": "Factor name (Budget Adequacy, Return on Investment, Cost Certainty, Funding Availability, Financial Risk)",
      "score": 75,
      "analysis": "Brief analysis",
      "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
      ]
    }
  ],
  "financialData": {
    "estimatedCost": "${projectPlan.estimatedCost}",
    "projectedRoi": "50%",
    "paybackPeriod": "16 months"
  },
  "operationalFactors": [
    {
      "factor": "Factor name (Timeline Feasibility, Resource Availability, Organizational Readiness, Change Management, Operational Risk)",
      "score": 70,
      "analysis": "Brief analysis",
      "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
      ]
    }
  ]
}

The scores should be percentages (0-100) with the following general meaning:
- 0-50: Critical issues, very high risk
- 51-65: Significant issues, high risk
- 66-75: Moderate issues, medium risk
- 76-85: Minor issues, low risk
- 86-100: No significant issues, very low risk

Overall score should be a weighted average of the three main categories, considering the specific requirements and constraints of the project.

Base your analysis on South African industry standards and best practices. For financial analysis, use South African market rates and ROI expectations. Consider the specific challenges of the ${projectRequirement.industry} industry in South Africa.
`;
}

// RFP Document prompts
export function createRfpDocumentPrompt(
  projectRequirement: ProjectRequirement,
  projectPlan: ProjectPlan,
  feasibilityStudy: FeasibilityStudy,
  documentType: string
): string {
  return `
Based on the following project information, generate a comprehensive Request for Proposal (RFP) document for a South African software development project. The document should follow South African procurement standards and best practices.

PROJECT REQUIREMENTS:
- Project Name: ${projectRequirement.name}
- Company: ${projectRequirement.company}
- Industry: ${projectRequirement.industry}
- Problem Statement: ${projectRequirement.problemStatement}
- Objective: ${projectRequirement.objective}
- Solution Description: ${projectRequirement.solutionDescription}
- Target Users: ${projectRequirement.targetUsers}
- Key Features: ${projectRequirement.keyFeatures}
- Preferred Technologies: ${projectRequirement.preferredTechnologies || 'Not specified'}
- Compliance Requirements: ${projectRequirement.complianceRequirements || 'Standard South African compliance'}
- Budget Range: ${projectRequirement.budgetRange}
- Timeline: ${projectRequirement.timeline}

PROJECT PLAN:
- Project Type: ${projectPlan.projectType}
- Estimated Duration: ${projectPlan.duration}
- Estimated Cost: ${projectPlan.estimatedCost}

FEASIBILITY STUDY:
- Overall Score: ${feasibilityStudy.overallScore}%
- Technical Score: ${feasibilityStudy.technicalScore}%
- Financial Score: ${feasibilityStudy.financialScore}%
- Operational Score: ${feasibilityStudy.operationalScore}%
- Recommendation: ${feasibilityStudy.recommendation}

The RFP document should be of type: ${documentType.toUpperCase()} (Standard, Government, or Simplified)

Format your response as a JSON object following this structure:
{
  "documentType": "${documentType}",
  "sections": [
    {
      "title": "Section title",
      "content": "Section content",
      "subsections": [
        {
          "title": "Subsection title",
          "content": "Subsection content"
        }
      ]
    }
  ]
}

For STANDARD RFP, include these sections:
1. Introduction and Background
2. Project Objectives
3. Scope of Work
4. Requirements Specification
5. Evaluation Criteria
6. Submission Guidelines
7. Timeline and Milestones
8. Terms and Conditions
9. Appendices

For GOVERNMENT RFP, include these sections:
1. Official Tender Notice
2. Background and Purpose
3. Scope of Work
4. Technical Requirements
5. BBBEE and Transformation Requirements
6. Evaluation Process and Criteria
7. Mandatory Compliance Requirements
8. Submission Instructions
9. General Conditions of Contract
10. Special Conditions of Contract

For SIMPLIFIED RFP, include these sections:
1. Project Overview
2. Requirements
3. Deliverables
4. Evaluation Criteria
5. Timeline
6. How to Submit

The content should be detailed and comprehensive, reflecting South African procurement practices and standards. Include any specific compliance requirements relevant to the ${projectRequirement.industry} industry in South Africa.
`;
}

// Schema definitions for function calling
export const projectPlanSchema = {
  type: "object",
  properties: {
    projectName: { type: "string" },
    projectType: { type: "string" },
    industry: { type: "string" },
    duration: { type: "string" },
    startDate: { type: "string" },
    estimatedCost: { type: "string" },
    milestones: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          targetDate: { type: "string" },
          progress: { type: "number" }
        },
        required: ["name", "description", "targetDate", "progress"]
      }
    },
    resourceAllocation: {
      type: "array",
      items: {
        type: "object",
        properties: {
          role: { type: "string" },
          allocation: { type: "string" },
          notes: { type: "string" }
        },
        required: ["role", "allocation", "notes"]
      }
    },
    riskAssessment: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: { type: "string" },
          probability: { type: "string" },
          impact: { type: "string" },
          mitigationStrategy: { type: "string" }
        },
        required: ["category", "probability", "impact", "mitigationStrategy"]
      }
    }
  },
  required: [
    "projectName",
    "projectType",
    "industry",
    "duration",
    "startDate",
    "estimatedCost",
    "milestones",
    "resourceAllocation",
    "riskAssessment"
  ]
};

export const feasibilityStudySchema = {
  type: "object",
  properties: {
    overallScore: { type: "number" },
    technicalScore: { type: "number" },
    financialScore: { type: "number" },
    operationalScore: { type: "number" },
    recommendation: { type: "string" },
    nextSteps: {
      type: "array",
      items: { type: "string" }
    },
    technicalFactors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          factor: { type: "string" },
          score: { type: "number" },
          analysis: { type: "string" },
          recommendations: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["factor", "score", "analysis", "recommendations"]
      }
    },
    financialFactors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          factor: { type: "string" },
          score: { type: "number" },
          analysis: { type: "string" },
          recommendations: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["factor", "score", "analysis", "recommendations"]
      }
    },
    financialData: {
      type: "object",
      properties: {
        estimatedCost: { type: "string" },
        projectedRoi: { type: "string" },
        paybackPeriod: { type: "string" }
      },
      required: ["estimatedCost", "projectedRoi", "paybackPeriod"]
    },
    operationalFactors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          factor: { type: "string" },
          score: { type: "number" },
          analysis: { type: "string" },
          recommendations: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["factor", "score", "analysis", "recommendations"]
      }
    }
  },
  required: [
    "overallScore",
    "technicalScore",
    "financialScore",
    "operationalScore",
    "recommendation",
    "nextSteps",
    "technicalFactors",
    "financialFactors",
    "financialData",
    "operationalFactors"
  ]
};

export const rfpDocumentSchema = {
  type: "object",
  properties: {
    documentType: { type: "string" },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
          subsections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                content: { type: "string" }
              },
              required: ["title", "content"]
            }
          }
        },
        required: ["title", "content"]
      }
    }
  },
  required: ["documentType", "sections"]
};
