import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import { ProjectRequirement, ProjectPlan, FeasibilityStudy } from "@/types";
import { formatPercentage } from "@/lib/utils";

import TechnicalFeasibility from "./TechnicalFeasibility";
import FinancialFeasibility from "./FinancialFeasibility";
import OperationalFeasibility from "./OperationalFeasibility";

interface FeasibilityPageProps {
  projectRequirement?: ProjectRequirement;
  projectPlan?: ProjectPlan;
  feasibilityStudy?: FeasibilityStudy;
  onSave: (data: FeasibilityStudy) => void;
}

export default function FeasibilityPage({
  projectRequirement,
  projectPlan,
  feasibilityStudy: initialFeasibilityStudy,
  onSave
}: FeasibilityPageProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("technical");
  const [feasibilityStudy, setFeasibilityStudy] = useState<FeasibilityStudy | undefined>(initialFeasibilityStudy);
  
  // Check if we have the required data
  useEffect(() => {
    if (!projectRequirement || !projectPlan) {
      toast({
        title: "Missing Information",
        description: "Please complete the previous steps first.",
        variant: "destructive",
      });
      
      if (!projectRequirement) {
        setLocation("/requirements");
      } else if (!projectPlan) {
        setLocation("/project-plan");
      }
    }
  }, [projectRequirement, projectPlan, setLocation, toast]);
  
  // If we don't have a feasibility study yet, generate one
  useEffect(() => {
    const generateFeasibilityStudy = async () => {
      if (!projectRequirement || !projectPlan || feasibilityStudy) return;
      
      setIsLoading(true);
      try {
        const response = await apiRequest(
          "POST", 
          "/api/feasibility/generate", 
          { projectRequirement, projectPlan }
        );
        
        const data = await response.json();
        setFeasibilityStudy(data);
      } catch (error) {
        console.error("Error generating feasibility study:", error);
        toast({
          title: "Error",
          description: "Failed to generate feasibility study. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    generateFeasibilityStudy();
  }, [projectRequirement, projectPlan, feasibilityStudy, toast]);
  
  const handleContinue = () => {
    if (feasibilityStudy) {
      onSave(feasibilityStudy);
      setLocation("/rfp");
    } else {
      toast({
        title: "Missing Feasibility Study",
        description: "Please wait for the feasibility study to be generated first.",
        variant: "destructive",
      });
    }
  };
  
  const handleRegenerateFeasibilityStudy = async () => {
    if (!projectRequirement || !projectPlan) return;
    
    setIsLoading(true);
    try {
      const response = await apiRequest(
        "POST", 
        "/api/feasibility/generate", 
        { projectRequirement, projectPlan }
      );
      
      const data = await response.json();
      setFeasibilityStudy(data);
      toast({
        title: "Success",
        description: "Feasibility study regenerated successfully.",
      });
    } catch (error) {
      console.error("Error regenerating feasibility study:", error);
      toast({
        title: "Error",
        description: "Failed to regenerate feasibility study. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!projectRequirement || !projectPlan) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Feasibility Analysis</h2>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Generating your feasibility analysis...</p>
            </div>
          ) : feasibilityStudy ? (
            <>
              <h3 className="text-xl font-medium mb-4">Feasibility Analysis</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive analysis of project feasibility across technical, financial, and operational dimensions.
              </p>
              
              {/* Overall Recommendation */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-medium mb-4">Overall Recommendation</h4>
                
                <div className="bg-blue-100 rounded-md px-4 py-2 mb-4">
                  <span className="text-sm font-semibold text-blue-800">
                    OVERALL FEASIBILITY: {formatPercentage(feasibilityStudy.overallScore)}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        feasibilityStudy.overallScore >= 80
                          ? "bg-green-500"
                          : feasibilityStudy.overallScore >= 70
                          ? "bg-blue-500"
                          : feasibilityStudy.overallScore >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${feasibilityStudy.overallScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{feasibilityStudy.recommendation}</p>
                
                <h5 className="font-medium mb-2">Recommended Next Steps:</h5>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {feasibilityStudy.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
              
              {/* Feasibility Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 w-full bg-transparent border-b rounded-none justify-start space-x-8">
                  <TabsTrigger
                    value="technical"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 rounded-none pb-2"
                  >
                    Technical Feasibility
                  </TabsTrigger>
                  <TabsTrigger
                    value="financial"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 rounded-none pb-2"
                  >
                    Financial Feasibility
                  </TabsTrigger>
                  <TabsTrigger
                    value="operational"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 rounded-none pb-2"
                  >
                    Operational Feasibility
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="technical">
                  <TechnicalFeasibility 
                    score={feasibilityStudy.technicalScore}
                    factors={feasibilityStudy.technicalFactors}
                  />
                </TabsContent>
                
                <TabsContent value="financial">
                  <FinancialFeasibility 
                    score={feasibilityStudy.financialScore}
                    factors={feasibilityStudy.financialFactors}
                    financialData={feasibilityStudy.financialData}
                  />
                </TabsContent>
                
                <TabsContent value="operational">
                  <OperationalFeasibility 
                    score={feasibilityStudy.operationalScore}
                    factors={feasibilityStudy.operationalFactors}
                  />
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-sm text-gray-600">
                This feasibility analysis is based on the information provided and industry standards for similar projects in South Africa.
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <Button 
                  onClick={handleRegenerateFeasibilityStudy} 
                  variant="outline" 
                  disabled={isLoading}
                >
                  Regenerate Analysis
                </Button>
                <Button 
                  onClick={() => {
                    // Implementation for exporting analysis
                    toast({
                      title: "Export",
                      description: "Export functionality will be implemented soon.",
                    });
                  }}
                  variant="secondary"
                >
                  Export Report
                </Button>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-600">No feasibility analysis available.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setLocation("/project-plan")}
        >
          Back to Project Plan
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!feasibilityStudy || isLoading}
        >
          Continue to RFP Generation
        </Button>
      </div>
    </div>
  );
}
