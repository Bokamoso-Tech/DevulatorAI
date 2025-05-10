import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProgressStepper from "./ProgressStepper";
import { Step } from "@/types";

interface AppLayoutProps {
  children: ReactNode;
  currentStep: Step;
}

export default function AppLayout({ children, currentStep }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentStep={currentStep} />
      <ProgressStepper currentStep={currentStep} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
