interface ProjectOverviewProps {
  projectName: string;
  projectType: string;
  industry: string;
  duration: string;
  startDate: string;
  estimatedCost: string;
}

export default function ProjectOverview({
  projectName,
  projectType,
  industry,
  duration,
  startDate,
  estimatedCost,
}: ProjectOverviewProps) {
  return (
    <div className="space-y-6 mb-8">
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-medium mb-4">Project Overview</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">PROJECT NAME</p>
            <p className="font-medium">{projectName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">PROJECT TYPE</p>
            <p className="font-medium">{projectType}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">INDUSTRY</p>
            <p className="font-medium">{industry}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">ESTIMATED DURATION</p>
            <p className="font-medium">{duration}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">START DATE</p>
            <p className="font-medium">{startDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">ESTIMATED COST</p>
            <p className="font-medium">{estimatedCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
