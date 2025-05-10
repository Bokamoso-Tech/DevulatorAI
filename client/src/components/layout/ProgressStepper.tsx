import { Step } from "@/types";
import { Link } from "wouter";

interface ProgressStepperProps {
  currentStep: Step;
}

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const steps: { id: Step; label: string }[] = [
    { id: "requirements", label: "Requirements" },
    { id: "project-plan", label: "Project Plan" },
    { id: "feasibility", label: "Feasibility" },
    { id: "rfp", label: "RFP Document" },
  ];

  const getStepNumber = (step: Step): number => {
    const index = steps.findIndex(s => s.id === step);
    return index + 1;
  };

  const isCompleted = (step: Step): boolean => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    const stepIndex = steps.findIndex(s => s.id === step);
    return stepIndex < currentIndex;
  };

  const isActive = (step: Step): boolean => {
    return step === currentStep;
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center z-10">
              <Link href={`/${step.id}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer
                  ${isActive(step.id) ? 'bg-blue-500 text-white' : 
                   isCompleted(step.id) ? 'bg-blue-500 text-white' : 
                   'bg-gray-300 text-gray-600'}`}>
                  {getStepNumber(step.id)}
                </span>
              </Link>
              <span className={`mt-1 text-xs text-center
                ${isActive(step.id) ? 'text-blue-500' : 
                 isCompleted(step.id) ? 'text-blue-500' : 
                 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
          
          {/* Horizontal connecting lines */}
          <div className="absolute top-4 left-0 right-0 flex justify-between z-0">
            <div className={`h-0.5 w-full ${isCompleted('project-plan') || isActive('project-plan') ? 'bg-blue-500' : 'bg-gray-300'}`} 
                 style={{ position: 'absolute', left: '15%', right: '65%' }}></div>
            <div className={`h-0.5 w-full ${isCompleted('feasibility') || isActive('feasibility') ? 'bg-blue-500' : 'bg-gray-300'}`} 
                 style={{ position: 'absolute', left: '40%', right: '40%' }}></div>
            <div className={`h-0.5 w-full ${isCompleted('rfp') || isActive('rfp') ? 'bg-blue-500' : 'bg-gray-300'}`} 
                 style={{ position: 'absolute', left: '65%', right: '15%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
