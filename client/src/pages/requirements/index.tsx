import { useState } from "react";
import { useLocation } from "wouter";
import { ProjectRequirement } from "@/types";
import RequirementsForm from "./RequirementsForm";

interface RequirementsPageProps {
  projectRequirement?: ProjectRequirement;
  onSave: (data: ProjectRequirement) => void;
}

export default function RequirementsPage({ projectRequirement, onSave }: RequirementsPageProps) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProjectRequirement) => {
    setIsLoading(true);
    try {
      // Save the form data
      onSave(data);
      // Navigate to the next step
      setLocation("/project-plan");
    } catch (error) {
      console.error("Error saving project requirements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Project Requirements</h2>
      <RequirementsForm 
        initialValues={projectRequirement} 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
      />
    </div>
  );
}
