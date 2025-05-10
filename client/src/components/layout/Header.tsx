import { Link } from "wouter";
import { Step } from "@/types";

interface HeaderProps {
  currentStep: Step;
}

export default function Header({ currentStep }: HeaderProps) {
  return (
    <header className="bg-blue-800 text-white py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold">Enhanced Devulator</h1>
            <p className="text-sm text-blue-200">Project Estimator & RFP Generator</p>
          </div>
          <nav className="flex space-x-4 text-sm">
            <Link href="/requirements">
              <span className={`px-3 py-2 rounded cursor-pointer ${currentStep === 'requirements' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                Requirements
              </span>
            </Link>
            <Link href="/project-plan">
              <span className={`px-3 py-2 rounded cursor-pointer ${currentStep === 'project-plan' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                Project Plan
              </span>
            </Link>
            <Link href="/feasibility">
              <span className={`px-3 py-2 rounded cursor-pointer ${currentStep === 'feasibility' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                Feasibility
              </span>
            </Link>
            <Link href="/rfp">
              <span className={`px-3 py-2 rounded cursor-pointer ${currentStep === 'rfp' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                RFP Document
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
