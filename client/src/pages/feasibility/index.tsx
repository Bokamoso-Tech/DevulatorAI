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
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Generating your feasibility analysis...</p>
            </div>
          ) : feasibilityStudy ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium">Project Feasibility Analysis</h3>
                  <p className="text-gray-600 mt-1">
                    Comprehensive project viability assessment considering technical, financial, and operational factors.
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-amber-500 mr-2">{feasibilityStudy.overallScore}%</span>
                  <span className="text-sm text-gray-600">Overall Score</span>
                </div>
              </div>
              
              {/* Overall Score Visualization */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">TECHNICAL</span>
                    <span className="text-sm font-medium">{feasibilityStudy.technicalScore}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mb-2">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: `${feasibilityStudy.technicalScore}%` }}></div>
                  </div>
                </div>
                
                <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">FINANCIAL</span>
                    <span className="text-sm font-medium">{feasibilityStudy.financialScore}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mb-2">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: `${feasibilityStudy.financialScore}%` }}></div>
                  </div>
                </div>
                
                <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">OPERATIONAL</span>
                    <span className="text-sm font-medium">{feasibilityStudy.operationalScore}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mb-2">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: `${feasibilityStudy.operationalScore}%` }}></div>
                  </div>
                </div>
              </div>
              
              {/* Recommendation Section */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-medium mb-4">Project Recommendation</h4>
                
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
                <TabsList className="mb-6 w-full bg-gray-50 border-b rounded-none justify-start space-x-2">
                  <TabsTrigger
                    value="technical"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none pb-2 px-4"
                  >
                    Technical
                  </TabsTrigger>
                  <TabsTrigger
                    value="financial"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none pb-2 px-4"
                  >
                    Financial
                  </TabsTrigger>
                  <TabsTrigger
                    value="operational"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none pb-2 px-4"
                  >
                    Operational
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
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-4">
                  This feasibility analysis is based on the information provided and industry standards for similar projects in South Africa.
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleRegenerateFeasibilityStudy} 
                    variant="outline" 
                    disabled={isLoading}
                    className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
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
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    Export Report
                  </Button>
                </div>
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
          className="border-gray-300 text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Project Plan
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!feasibilityStudy || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue to RFP Generation
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6"/></svg>
        </Button>
      </div>
    </div>
  );
}
