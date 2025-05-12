import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FallbackNotificationProps {
  isVisible: boolean;
  documentType: string;
}

export function FallbackNotification({ isVisible, documentType }: FallbackNotificationProps) {
  if (!isVisible) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Using Fallback Generator</AlertTitle>
      <AlertDescription>
        {`The ${documentType} was generated using the local fallback system because the Azure OpenAI service could not be reached. 
        The content is based on template data and may not be as tailored to your requirements.`}
      </AlertDescription>
    </Alert>
  );
}