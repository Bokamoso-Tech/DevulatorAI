import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  industry: text("industry").notNull(),
  contactEmail: text("contact_email").notNull(),
  problemStatement: text("problem_statement").notNull(),
  objective: text("objective").notNull(),
  solutionDescription: text("solution_description").notNull(),
  targetUsers: text("target_users").notNull(),
  keyFeatures: text("key_features").notNull(),
  preferredTechnologies: text("preferred_technologies"),
  complianceRequirements: text("compliance_requirements"),
  budgetRange: text("budget_range").notNull(),
  timeline: text("timeline").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectPlans = pgTable("project_plans", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  startDate: text("start_date").notNull(),
  estimatedCost: text("estimated_cost").notNull(),
  milestones: jsonb("milestones").notNull(),
  resourceAllocation: jsonb("resource_allocation").notNull(),
  riskAssessment: jsonb("risk_assessment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const feasibilityStudies = pgTable("feasibility_studies", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  overallScore: integer("overall_score").notNull(),
  technicalScore: integer("technical_score").notNull(),
  financialScore: integer("financial_score").notNull(),
  operationalScore: integer("operational_score").notNull(),
  technicalFactors: jsonb("technical_factors").notNull(),
  financialFactors: jsonb("financial_factors").notNull(),
  operationalFactors: jsonb("operational_factors").notNull(),
  nextSteps: jsonb("next_steps").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rfpDocuments = pgTable("rfp_documents", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  documentType: text("document_type").notNull(),
  sections: jsonb("sections").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ 
  id: true,
  createdAt: true
});

export const insertProjectPlanSchema = createInsertSchema(projectPlans).omit({
  id: true,
  createdAt: true
});

export const insertFeasibilityStudySchema = createInsertSchema(feasibilityStudies).omit({
  id: true,
  createdAt: true
});

export const insertRfpDocumentSchema = createInsertSchema(rfpDocuments).omit({
  id: true,
  createdAt: true
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type ProjectPlan = typeof projectPlans.$inferSelect;
export type InsertProjectPlan = z.infer<typeof insertProjectPlanSchema>;

export type FeasibilityStudy = typeof feasibilityStudies.$inferSelect;
export type InsertFeasibilityStudy = z.infer<typeof insertFeasibilityStudySchema>;

export type RfpDocument = typeof rfpDocuments.$inferSelect;
export type InsertRfpDocument = z.infer<typeof insertRfpDocumentSchema>;
