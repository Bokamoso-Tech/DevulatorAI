import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { 
  ProjectRequirement, 
  ProjectPlan, 
  FeasibilityStudy, 
  RfpDocument 
} from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RfpPageProps {
  projectRequirement?: ProjectRequirement;
  projectPlan?: ProjectPlan;
  feasibilityStudy?: FeasibilityStudy;
  rfpDocument?: RfpDocument;
  onSave: (data: RfpDocument) => void;
}

export default function RfpPage({
  projectRequirement,
  projectPlan,
  feasibilityStudy,
  rfpDocument: initialRfpDocument,
  onSave
}: RfpPageProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [rfpDocument, setRfpDocument] = useState<RfpDocument | undefined>(initialRfpDocument);
  const [documentType, setDocumentType] = useState<string>("standard");

  // Check if we have the required data
  useEffect(() => {
    if (!projectRequirement || !projectPlan || !feasibilityStudy) {
      toast({
        title: "Missing Information",
        description: "Please complete the previous steps first.",
        variant: "destructive",
      });

      if (!projectRequirement) {
        setLocation("/requirements");
      } else if (!projectPlan) {
        setLocation("/project-plan");
      } else if (!feasibilityStudy) {
        setLocation("/feasibility");
      }
    }
  }, [projectRequirement, projectPlan, feasibilityStudy, setLocation, toast]);

  // If we don't have an RFP document yet, generate one
  useEffect(() => {
    const generateRfpDocument = async () => {
      if (!projectRequirement || !projectPlan || !feasibilityStudy || rfpDocument) return;

      setIsLoading(true);
      try {
        const response = await apiRequest(
          "POST", 
          "/api/rfp/generate", 
          { 
            projectRequirement, 
            projectPlan, 
            feasibilityStudy,
            documentType
          }
        );

        const result = await response.json();
        if (!result.data) {
          throw new Error("No RFP data received from server");
        }
        setRfpDocument(result.data);
        onSave(result.data);
      } catch (error) {
        console.error("Error generating RFP document:", error);
        toast({
          title: "Error",
          description: "Failed to generate RFP document. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateRfpDocument();
  }, [projectRequirement, projectPlan, feasibilityStudy, rfpDocument, documentType, onSave, toast]);

  const handleRegenerateRfpDocument = async () => {
    if (!projectRequirement || !projectPlan || !feasibilityStudy) return;

    setIsLoading(true);
    try {
      const response = await apiRequest(
        "POST", 
        "/api/rfp/generate", 
        { 
          projectRequirement, 
          projectPlan, 
          feasibilityStudy,
          documentType
        }
      );

      const result = await response.json();
      setRfpDocument(result.data);
      onSave(result.data);
      toast({
        title: "Success",
        description: "RFP document regenerated successfully.",
      });
    } catch (error) {
      console.error("Error regenerating RFP document:", error);
      toast({
        title: "Error",
        description: "Failed to regenerate RFP document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentTypeChange = async (value: string) => {
    if (value === documentType) return;

    setDocumentType(value);
    if (projectRequirement && projectPlan && feasibilityStudy) {
      setIsLoading(true);
      try {
        const response = await apiRequest(
          "POST", 
          "/api/rfp/generate", 
          { 
            projectRequirement, 
            projectPlan, 
            feasibilityStudy,
            documentType: value
          }
        );

        const data = await response.json();
        setRfpDocument(data);
        onSave(data);
      } catch (error) {
        console.error("Error generating RFP document:", error);
        toast({
          title: "Error",
          description: "Failed to generate RFP document. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!projectRequirement || !projectPlan || !feasibilityStudy) {
    return null; // Will redirect in useEffect
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">RFP Document Generation</h2>

      <Card className="mb-6">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Generating your RFP document...</p>
            </div>
          ) : rfpDocument ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">RFP Document</h3>
                <div className="w-64">
                  <Select value={documentType} onValueChange={handleDocumentTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select RFP template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard RFP</SelectItem>
                      <SelectItem value="government">Government RFP</SelectItem>
                      <SelectItem value="simplified">Simplified RFP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-8">
                {rfpDocument?.sections?.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                    <div className="prose max-w-none">
                      <p>{section.content}</p>

                      {section.subsections && section.subsections.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {section.subsections.map((subsection, subIndex) => (
                            <div key={subIndex} className="ml-4">
                              <h5 className="text-md font-medium mb-2">{subsection.title}</h5>
                              <p>{subsection.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button 
                  onClick={handleRegenerateRfpDocument} 
                  variant="outline" 
                  disabled={isLoading}
                >
                  Regenerate RFP
                </Button>
                <Button 
                  onClick={() => {
                      if (!rfpDocument) return;

                      import('@react-pdf/renderer').then(({ pdf }) => {
                        import('@/components/pdf/RfpPdf').then(({ RfpPdf }) => {
                          pdf(<RfpPdf rfpDocument={rfpDocument} />)
                            .toBlob()
                            .then((blob) => {
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = 'rfp-document.pdf';
                              link.click();
                              URL.revokeObjectURL(url);

                              toast({
                                title: "Success",
                                description: "RFP document exported successfully.",
                              });
                            })
                            .catch((error) => {
                              console.error('Error generating PDF:', error);
                              toast({
                                title: "Error",
                                description: "Failed to export RFP document.",
                                variant: "destructive",
                              });
                            });
                        });
                      });
                    }}
                    variant="secondary"
                  >
                    Export RFP
                </Button>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-600">No RFP document available.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setLocation("/feasibility")}
        >
          Back to Feasibility
        </Button>
        <Button
          onClick={() => {
            toast({
              title: "Project Complete",
              description: "Your RFP document has been generated successfully.",
            });
          }}
          disabled={!rfpDocument || isLoading}
        >
          Finalize Project
        </Button>
      </div>
    </div>
  );
}