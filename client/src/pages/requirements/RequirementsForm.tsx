import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProjectRequirement } from "@/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { budgetRangeOptions, industryOptions, timelineOptions } from "@/lib/utils";

interface RequirementsFormProps {
  initialValues?: ProjectRequirement;
  onSubmit: (data: ProjectRequirement) => void;
  isLoading: boolean;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  industry: z.string().min(1, { message: "Industry selection is required" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  problemStatement: z.string().min(20, { message: "Problem statement must be at least 20 characters" }),
  objective: z.string().min(20, { message: "Objective must be at least 20 characters" }),
  solutionDescription: z.string().min(20, { message: "Solution description must be at least 20 characters" }),
  targetUsers: z.string().min(5, { message: "Target users must be at least 5 characters" }),
  keyFeatures: z.string().min(10, { message: "Key features must be at least 10 characters" }),
  preferredTechnologies: z.string().optional(),
  complianceRequirements: z.string().optional(),
  budgetRange: z.string().min(1, { message: "Budget range selection is required" }),
  timeline: z.string().min(1, { message: "Timeline selection is required" }),
});

export default function RequirementsForm({ initialValues, onSubmit, isLoading }: RequirementsFormProps) {
  const defaultValues: Partial<ProjectRequirement> = {
    name: "",
    company: "",
    industry: "",
    contactEmail: "",
    problemStatement: "",
    objective: "",
    solutionDescription: "",
    targetUsers: "",
    keyFeatures: "",
    preferredTechnologies: "",
    complianceRequirements: "",
    budgetRange: "",
    timeline: "",
    ...initialValues,
  };

  const form = useForm<ProjectRequirement>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {industryOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter contact email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="problemStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Statement</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the problem that needs to be solved" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Clearly define the problem or challenge your organization is facing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Objective</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What are the main goals of this project?" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Define the key objectives you want to achieve with this solution
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solutionDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the solution you're looking to build" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a high-level description of the solution you envision
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetUsers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Users</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Who will use this solution?" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the primary users and stakeholders of the solution
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Features</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List the main features required" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    List the most important features and functionality required
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredTechnologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Technologies (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any preferred technologies or platforms?" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Specify any technologies or platforms you prefer to use
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complianceRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compliance Requirements (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any specific compliance requirements?" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Specify any regulatory or compliance requirements (e.g., POPIA, GDPR)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budgetRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgetRangeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeline</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timelineOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Generating Project Plan..." : "Generate Project Plan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
