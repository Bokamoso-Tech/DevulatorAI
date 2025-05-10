import { useState } from "react";
import { Switch, Route, Link, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import RequirementsPage from "@/pages/requirements";
import ProjectPlanPage from "@/pages/project-plan";
import FeasibilityPage from "@/pages/feasibility";
import RfpPage from "@/pages/rfp";
import { AppState, ProjectRequirement, ProjectPlan, FeasibilityStudy, RfpDocument, Step } from "@/types";
import AppLayout from "@/components/layout/AppLayout";

function App() {
  const [state, setState] = useState<AppState>({
    currentStep: 'requirements'
  });
  
  const [location] = useLocation();
  
  // Update current step based on location
  const getCurrentStepFromPath = (path: string): Step => {
    if (path.includes("/requirements")) return "requirements";
    if (path.includes("/project-plan")) return "project-plan";
    if (path.includes("/feasibility")) return "feasibility";
    if (path.includes("/rfp")) return "rfp";
    return "requirements";
  };
  
  // When location changes, update current step
  if (location !== "/" && state.currentStep !== getCurrentStepFromPath(location)) {
    setState(prev => ({
      ...prev,
      currentStep: getCurrentStepFromPath(location)
    }));
  }
  
  const updateProjectRequirement = (data: ProjectRequirement) => {
    setState(prev => ({
      ...prev,
      projectRequirement: data,
      currentStep: 'project-plan'
    }));
  };
  
  const updateProjectPlan = (data: ProjectPlan) => {
    setState(prev => ({
      ...prev,
      projectPlan: data,
      currentStep: 'feasibility'
    }));
  };
  
  const updateFeasibilityStudy = (data: FeasibilityStudy) => {
    setState(prev => ({
      ...prev,
      feasibilityStudy: data,
      currentStep: 'rfp'
    }));
  };
  
  const updateRfpDocument = (data: RfpDocument) => {
    setState(prev => ({
      ...prev,
      rfpDocument: data
    }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppLayout currentStep={state.currentStep}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/requirements">
              <RequirementsPage 
                projectRequirement={state.projectRequirement} 
                onSave={updateProjectRequirement} 
              />
            </Route>
            <Route path="/project-plan">
              <ProjectPlanPage 
                projectRequirement={state.projectRequirement} 
                projectPlan={state.projectPlan}
                onSave={updateProjectPlan}
              />
            </Route>
            <Route path="/feasibility">
              <FeasibilityPage 
                projectRequirement={state.projectRequirement} 
                projectPlan={state.projectPlan}
                feasibilityStudy={state.feasibilityStudy}
                onSave={updateFeasibilityStudy}
              />
            </Route>
            <Route path="/rfp">
              <RfpPage 
                projectRequirement={state.projectRequirement} 
                projectPlan={state.projectPlan}
                feasibilityStudy={state.feasibilityStudy}
                rfpDocument={state.rfpDocument}
                onSave={updateRfpDocument}
              />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </AppLayout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
