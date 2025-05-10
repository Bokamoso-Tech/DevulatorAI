import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateProjectPlan } from "./generators/projectPlan";
import { generateFeasibilityStudy } from "./generators/feasibility";
import { generateRfpDocument } from "./generators/rfp";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for project plan generation
  app.post("/api/project-plan/generate", async (req, res) => {
    try {
      const projectRequirement = req.body;
      const projectPlan = await generateProjectPlan(projectRequirement);
      res.json(projectPlan);
    } catch (error) {
      console.error("Error generating project plan:", error);
      res.status(500).json({ message: "Failed to generate project plan" });
    }
  });

  // API routes for feasibility study generation
  app.post("/api/feasibility/generate", async (req, res) => {
    try {
      const { projectRequirement, projectPlan } = req.body;
      const feasibilityStudy = await generateFeasibilityStudy(
        projectRequirement,
        projectPlan
      );
      res.json(feasibilityStudy);
    } catch (error) {
      console.error("Error generating feasibility study:", error);
      res.status(500).json({ message: "Failed to generate feasibility study" });
    }
  });

  // API routes for RFP document generation
  app.post("/api/rfp/generate", async (req, res) => {
    try {
      const { projectRequirement, projectPlan, feasibilityStudy, documentType } = req.body;
      const rfpDocument = await generateRfpDocument(
        projectRequirement,
        projectPlan,
        feasibilityStudy,
        documentType || "standard"
      );
      res.json(rfpDocument);
    } catch (error) {
      console.error("Error generating RFP document:", error);
      res.status(500).json({ message: "Failed to generate RFP document" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
