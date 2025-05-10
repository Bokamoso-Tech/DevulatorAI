import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { ProjectRequirement, ProjectPlan } from "@/types";
import ProjectOverview from "./ProjectOverview";
import ProjectMilestones from "./ProjectMilestones";
import ResourceAllocation from "./ResourceAllocation";
import RiskAssessment from "./RiskAssessment";

interface ProjectPlanPageProps {
  projectRequirement?: ProjectRequirement;
  projectPlan?: ProjectPlan;
  onSave: (data: ProjectPlan) => void;
}

export default function ProjectPlanPage({ 
  projectRequirement, 
  projectPlan: initialProjectPlan, 
  onSave 
}: ProjectPlanPageProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [projectPlan, setProjectPlan] = useState<ProjectPlan | undefined>(initialProjectPlan);
  
  // Check if we have the required data
  useEffect(() => {
    if (!projectRequirement) {
      toast({
        title: "Missing Requirements",
        description: "Please complete the requirements form first.",
        variant: "destructive",
      });
      setLocation("/requirements");
    }
  }, [projectRequirement, setLocation, toast]);
  
  // If we don't have a project plan yet, generate one
  useEffect(() => {
    const generateProjectPlan = async () => {
      if (!projectRequirement || projectPlan) return;
      
      setIsLoading(true);
      try {
        const response = await apiRequest(
          "POST", 
          "/api/project-plan/generate", 
          projectRequirement
        );
        
        const data = await response.json();
        setProjectPlan(data);
      } catch (error) {
        console.error("Error generating project plan:", error);
        toast({
          title: "Error",
          description: "Failed to generate project plan. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    generateProjectPlan();
  }, [projectRequirement, projectPlan, toast]);
  
  const handleContinue = () => {
    if (projectPlan) {
      onSave(projectPlan);
      setLocation("/feasibility");
    } else {
      toast({
        title: "Missing Project Plan",
        description: "Please wait for the project plan to be generated first.",
        variant: "destructive",
      });
    }
  };
  
  const handleRegenerateProjectPlan = async () => {
    if (!projectRequirement) return;
    
    setIsLoading(true);
    try {
      const response = await apiRequest(
        "POST", 
        "/api/project-plan/generate", 
        projectRequirement
      );
      
      const data = await response.json();
      setProjectPlan(data);
      toast({
        title: "Success",
        description: "Project plan regenerated successfully.",
      });
    } catch (error) {
      console.error("Error regenerating project plan:", error);
      toast({
        title: "Error",
        description: "Failed to regenerate project plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!projectRequirement) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Project Plan Generation</h2>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Generating your project plan...</p>
            </div>
          ) : projectPlan ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium">Project Plan</h3>
                  <p className="text-gray-600 mt-1">
                    South African-compliant project plan based on your requirements.
                  </p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {projectPlan.projectType}
                </span>
              </div>
              
              <ProjectOverview 
                projectName={projectPlan.projectName}
                projectType={projectPlan.projectType}
                industry={projectPlan.industry}
                duration={projectPlan.duration}
                startDate={projectPlan.startDate}
                estimatedCost={projectPlan.estimatedCost}
              />
              
              <ProjectMilestones milestones={projectPlan.milestones} />
              <ResourceAllocation resources={projectPlan.resourceAllocation} />
              <RiskAssessment risks={projectPlan.riskAssessment} />
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-4">
                  This project plan meets South African standards for software development projects and includes industry-standard resource allocation and timeline estimates.
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleRegenerateProjectPlan} 
                    variant="outline" 
                    disabled={isLoading}
                    className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Regenerate Plan
                  </Button>
                  <Button 
                    onClick={() => {
                      // Implementation for exporting plan
                      toast({
                        title: "Export",
                        description: "Export functionality will be implemented soon.",
                      });
                    }}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    Export Plan
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-600">No project plan available.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setLocation("/requirements")}
          className="border-gray-300 text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Requirements
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!projectPlan || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue to Feasibility
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6"/></svg>
        </Button>
      </div>
    </div>
  );
}
