import { ProjectRequirement, ProjectPlan, FeasibilityStudy, FeasibilityFactor, FinancialData } from "../../client/src/types";
import { generateWithFunctionCalling } from "../openai";
import { createFeasibilityStudyPrompt, feasibilityStudySchema } from "./prompts";

// Function to generate a local feasibility study without relying on OpenAI
function generateLocalFeasibilityStudy(
  projectRequirement: ProjectRequirement,
  projectPlan: ProjectPlan
): FeasibilityStudy {
  // Extract cost from project plan to use in feasibility calculations
  const costString = projectPlan.estimatedCost;
  
  // Sample technical factors
  const technicalFactors: FeasibilityFactor[] = [
    {
      factor: "Technology Stack Complexity",
      score: 75,
      analysis: "The proposed technology stack is moderately complex but well-suited for the requirements. The team has prior experience with most components.",
      recommendations: [
        "Conduct a technical spike on any unfamiliar technologies",
        "Document architecture decisions to ensure consistency"
      ]
    },
    {
      factor: "Integration Complexity",
      score: 65,
      analysis: "Multiple integration points with existing systems create moderate complexity and potential risk areas.",
      recommendations: [
        "Create a detailed integration plan with fallback options",
        "Implement early proof-of-concept for critical integrations"
      ]
    },
    {
      factor: "Scalability Requirements",
      score: 80,
      analysis: "The proposed architecture should handle expected growth for the next 2-3 years with minimal changes.",
      recommendations: [
        "Implement performance testing early in the development cycle",
        "Document scaling strategy for future reference"
      ]
    },
    {
      factor: "Security Considerations",
      score: 70,
      analysis: "Standard security practices will address most requirements, but some specialized handling may be needed for compliance.",
      recommendations: [
        "Conduct security assessment before deployment",
        "Implement regular security audits"
      ]
    }
  ];
  
  // Sample financial factors
  const financialFactors: FeasibilityFactor[] = [
    {
      factor: "Budget Adequacy",
      score: 75,
      analysis: "The allocated budget appears sufficient, but has limited contingency for unexpected issues.",
      recommendations: [
        "Consider allocating an additional 15% contingency fund",
        "Implement strict change control to prevent scope creep"
      ]
    },
    {
      factor: "ROI Potential",
      score: 85,
      analysis: "Expected benefits significantly outweigh costs, with payback likely within 18 months.",
      recommendations: [
        "Document baseline metrics to accurately measure ROI after implementation",
        "Consider phased implementation to realize benefits earlier"
      ]
    },
    {
      factor: "Cost Risk",
      score: 70,
      analysis: "Several areas could lead to cost overruns if not carefully managed.",
      recommendations: [
        "Implement detailed cost tracking by feature",
        "Set clear cost thresholds for re-evaluation"
      ]
    },
    {
      factor: "Market Timing",
      score: 80,
      analysis: "The market conditions are favorable for this type of project in the South African context.",
      recommendations: [
        "Accelerate time-to-market for competitive advantage",
        "Monitor market changes that could impact project value"
      ]
    }
  ];
  
  // Sample operational factors
  const operationalFactors: FeasibilityFactor[] = [
    {
      factor: "Resource Availability",
      score: 65,
      analysis: "Some specialized skills may be difficult to source or retain for the project duration.",
      recommendations: [
        "Identify critical resource needs and secure commitments early",
        "Consider training or knowledge transfer for sustainability"
      ]
    },
    {
      factor: "Organizational Readiness",
      score: 70,
      analysis: "The organization shows good support but may have competing priorities during the project timeframe.",
      recommendations: [
        "Develop a stakeholder management plan",
        "Secure executive sponsorship for resource conflicts"
      ]
    },
    {
      factor: "Process Impact",
      score: 75,
      analysis: "Implementation will require moderate changes to existing business processes.",
      recommendations: [
        "Map current vs. future state processes",
        "Plan for adequate training and transition support"
      ]
    },
    {
      factor: "Regulatory Compliance",
      score: 80,
      analysis: "The project appears to address relevant South African regulations, with minimal compliance risk.",
      recommendations: [
        "Schedule a compliance review before deployment",
        "Maintain documentation of compliance measures"
      ]
    }
  ];
  
  // Financial data extracted and derived from project plan
  const financialData: FinancialData = {
    estimatedCost: projectPlan.estimatedCost,
    projectedRoi: "135% over 3 years",
    paybackPeriod: "18 months"
  };
  
  // Calculate overall score (weighted average of the three categories)
  const technicalScore = technicalFactors.reduce((sum, factor) => sum + factor.score, 0) / technicalFactors.length;
  const financialScore = financialFactors.reduce((sum, factor) => sum + factor.score, 0) / financialFactors.length;
  const operationalScore = operationalFactors.reduce((sum, factor) => sum + factor.score, 0) / operationalFactors.length;
  
  const overallScore = Math.round((technicalScore * 0.35) + (financialScore * 0.4) + (operationalScore * 0.25));
  
  // Determine recommendation based on overall score
  let recommendation = "";
  if (overallScore >= 80) {
    recommendation = "The project shows strong feasibility across all dimensions and is recommended to proceed as planned.";
  } else if (overallScore >= 70) {
    recommendation = "The project shows good feasibility with some areas requiring attention. Proceed with the recommended risk mitigations in place.";
  } else if (overallScore >= 60) {
    recommendation = "The project shows moderate feasibility with significant challenges identified. Consider addressing high-risk areas before proceeding.";
  } else {
    recommendation = "The project faces substantial challenges across multiple dimensions. A significant re-evaluation or restructuring is recommended before proceeding.";
  }
  
  return {
    overallScore,
    technicalScore: Math.round(technicalScore),
    financialScore: Math.round(financialScore),
    operationalScore: Math.round(operationalScore),
    recommendation,
    nextSteps: [
      "Review and address high-priority recommendations",
      "Secure necessary resources and stakeholder commitment",
      "Develop detailed implementation plan with risk mitigations",
      "Establish progress metrics and regular review points"
    ],
    technicalFactors,
    financialFactors,
    financialData,
    operationalFactors
  };
}

export async function generateFeasibilityStudy(
  projectRequirement: ProjectRequirement,
  projectPlan: ProjectPlan
): Promise<{data: FeasibilityStudy, usedFallback: boolean}> {
  try {
    console.log("Generating feasibility study for:", projectRequirement.name);
    
    // Generate the prompt
    const prompt = createFeasibilityStudyPrompt(projectRequirement, projectPlan);
    
    try {
      // Try to call OpenAI with function calling
      const result = await generateWithFunctionCalling<FeasibilityStudy>(
        prompt,
        feasibilityStudySchema,
        "generate_feasibility_study"
      );
      
      return { data: result, usedFallback: false };
    } catch (aiError) {
      console.error("Error calling OpenAI API for feasibility study, falling back to local generation:", aiError);
      
      // If OpenAI fails, use the local generator as a fallback
      console.log("Using local feasibility study generator as fallback");
      return { data: generateLocalFeasibilityStudy(projectRequirement, projectPlan), usedFallback: true };
    }
  } catch (error) {
    console.error("Error generating feasibility study:", error);
    
    // Final fallback if even the local generator fails
    console.log("All feasibility study generation attempts failed, using emergency fallback");
    return { data: generateLocalFeasibilityStudy(projectRequirement, projectPlan), usedFallback: true };
  }
}
