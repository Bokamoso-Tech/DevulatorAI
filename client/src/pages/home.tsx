import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const [, setLocation] = useLocation();
  
  // Redirect to requirements page after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation('/requirements');
    }, 100);
    
    return () => clearTimeout(timer);
  }, [setLocation]);
  
  return (
    <div className="flex items-center justify-center h-[calc(100vh-300px)]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Enhanced Devulator</CardTitle>
          <CardDescription>
            Project Estimator & RFP Generator for South African Organizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Generate South African-compliant project plans, cost estimates, feasibility studies, and RFPs for your next project.
          </p>
          <p className="text-gray-600">
            You'll be redirected to the requirements form in a moment...
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setLocation('/requirements')} className="w-full">
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
