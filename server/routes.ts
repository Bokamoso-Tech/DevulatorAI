import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateProjectPlan } from "./generators/projectPlan";
import { generateFeasibilityStudy } from "./generators/feasibility";
import { generateRfpDocument } from "./generators/rfp";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  httpServer.setTimeout(300_000); // 5 minutes timeout

  // API routes for project plan generation
  app.post("/api/project-plan/generate", async (req, res) => {
    try {
      const projectRequirement = req.body;
      const result = await generateProjectPlan(projectRequirement);
      res.json({
        data: result.data,
        usedFallback: result.usedFallback,
      });
    } catch (error) {
      console.error("Error generating project plan:", error);
      res.status(500).json({ message: "Failed to generate project plan" });
    }
  });

  // API routes for feasibility study generation
  app.post("/api/feasibility/generate", async (req, res) => {
    try {
      const { projectRequirement, projectPlan } = req.body;
      const result = await generateFeasibilityStudy(
        projectRequirement,
        projectPlan,
      );
      res.json({
        data: result.data,
        usedFallback: result.usedFallback,
      });
    } catch (error) {
      console.error("Error generating feasibility study:", error);
      res.status(500).json({ message: "Failed to generate feasibility study" });
    }
  });

  // API routes for RFP document generation
  app.post("/api/rfp/generate", async (req, res) => {
    try {
      const {
        projectRequirement,
        projectPlan,
        feasibilityStudy,
        documentType,
      } = req.body;
      const result = await generateRfpDocument(
        projectRequirement,
        projectPlan,
        feasibilityStudy,
        documentType || "standard",
      );
      res.json({
        data: result.data,
        usedFallback: result.usedFallback,
      });

      res.json(result.data);
    } catch (error) {
      console.error("Error generating RFP document:", error);
      res.status(500).json({ message: "Failed to generate RFP document" });
    }
  });

  //const httpServer = createServer(app);

  return httpServer;
}
