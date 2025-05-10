// Project types
export interface ProjectRequirement {
  name: string;
  company: string;
  industry: string;
  contactEmail: string;
  problemStatement: string;
  objective: string;
  solutionDescription: string;
  targetUsers: string;
  keyFeatures: string;
  preferredTechnologies?: string;
  complianceRequirements?: string;
  budgetRange: string;
  timeline: string;
}

// Project Plan types
export interface Milestone {
  name: string;
  description: string;
  targetDate: string;
  progress: number;
}

export interface ResourceRole {
  role: string;
  allocation: string;
  notes: string;
}

export interface RiskItem {
  category: string;
  probability: string;
  impact: string;
  mitigationStrategy: string;
}

export interface ProjectPlan {
  projectName: string;
  projectType: string;
  industry: string;
  duration: string;
  startDate: string;
  estimatedCost: string;
  milestones: Milestone[];
  resourceAllocation: ResourceRole[];
  riskAssessment: RiskItem[];
}

// Feasibility types
export interface FeasibilityFactor {
  factor: string;
  score: number;
  analysis: string;
  recommendations: string[];
}

export interface FinancialData {
  estimatedCost: string;
  projectedRoi: string;
  paybackPeriod: string;
}

export interface FeasibilityStudy {
  overallScore: number;
  technicalScore: number;
  financialScore: number;
  operationalScore: number;
  recommendation: string;
  nextSteps: string[];
  technicalFactors: FeasibilityFactor[];
  financialFactors: FeasibilityFactor[];
  financialData: FinancialData;
  operationalFactors: FeasibilityFactor[];
}

// RFP types
export interface RfpSection {
  title: string;
  content: string;
  subsections?: RfpSection[];
}

export interface RfpDocument {
  documentType: string;
  sections: RfpSection[];
}

// Application state types
export type Step = 'requirements' | 'project-plan' | 'feasibility' | 'rfp';

export interface AppState {
  currentStep: Step;
  projectRequirement?: ProjectRequirement;
  projectPlan?: ProjectPlan;
  feasibilityStudy?: FeasibilityStudy;
  rfpDocument?: RfpDocument;
}
