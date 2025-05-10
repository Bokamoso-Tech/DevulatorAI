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
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <Link href={`/${step.id}`}>
                <a className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${isActive(step.id) ? 'bg-secondary text-white' : 
                   isCompleted(step.id) ? 'bg-secondary text-white' : 
                   'bg-gray-300 text-gray-600'}`}>
                  {getStepNumber(step.id)}
                </a>
              </Link>
              <span className={`mt-1 text-xs text-center
                ${isActive(step.id) ? 'text-secondary' : 
                 isCompleted(step.id) ? 'text-secondary' : 
                 'text-gray-500'}`}>
                {step.label}
              </span>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 w-16 
                  ${isCompleted(steps[index + 1].id) || isActive(steps[index + 1].id) ? 'bg-secondary' : 'bg-gray-300'}`} 
                  style={{ position: 'absolute', left: `calc(50% + ${index * 100}px)`, transform: 'translateX(-50%)' }}>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
