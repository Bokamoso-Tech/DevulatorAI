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
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-6">Project Overview</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">PROJECT NAME</p>
            <p className="font-medium text-gray-800">{projectName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">INDUSTRY</p>
            <p className="font-medium text-gray-800">{industry}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">PROJECT TYPE</p>
            <p className="font-medium text-gray-800">{projectType}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">ESTIMATED DURATION</p>
            <p className="font-medium text-gray-800">{duration}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
          <p className="text-xs font-medium text-blue-600 uppercase mb-2">PROJECTED START DATE</p>
          <p className="font-medium text-gray-800 text-lg">{startDate}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-5 border border-green-100">
          <p className="text-xs font-medium text-green-600 uppercase mb-2">ESTIMATED COST</p>
          <p className="font-medium text-gray-800 text-lg">{estimatedCost}</p>
        </div>
      </div>
    </div>
  );
}
