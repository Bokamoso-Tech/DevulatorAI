import { Link } from "wouter";
import { Step } from "@/types";

interface HeaderProps {
  currentStep: Step;
}

export default function Header({ currentStep }: HeaderProps) {
  return (
    <header className="bg-primary-700 text-white py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold">Enhanced Devulator</h1>
            <p className="text-sm text-blue-200">Project Estimator & RFP Generator for South African Organizations</p>
          </div>
          <nav className="flex space-x-4 text-sm">
            <Link href="/requirements">
              <a className={`px-3 py-2 rounded ${currentStep === 'requirements' ? 'bg-primary-600' : 'hover:bg-primary-600'}`}>
                Requirements
              </a>
            </Link>
            <Link href="/project-plan">
              <a className={`px-3 py-2 rounded ${currentStep === 'project-plan' ? 'bg-primary-600' : 'hover:bg-primary-600'}`}>
                Project Plan
              </a>
            </Link>
            <Link href="/feasibility">
              <a className={`px-3 py-2 rounded ${currentStep === 'feasibility' ? 'bg-primary-600' : 'hover:bg-primary-600'}`}>
                Feasibility
              </a>
            </Link>
            <Link href="/rfp">
              <a className={`px-3 py-2 rounded ${currentStep === 'rfp' ? 'bg-primary-600' : 'hover:bg-primary-600'}`}>
                RFP Document
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
