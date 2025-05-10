import { Milestone } from "@/types";

interface ProjectMilestonesProps {
  milestones: Milestone[];
}

export default function ProjectMilestones({ milestones }: ProjectMilestonesProps) {
  return (
    <div className="mt-8">
      <h4 className="text-lg font-medium text-gray-800 mb-4">Project Milestone Plan</h4>
      
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MILESTONE</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DESCRIPTION</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TARGET DATE</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PROGRESS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {milestones.map((milestone, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {milestone.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {milestone.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {milestone.targetDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-32">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right mt-1 text-gray-600 font-medium">
                      {milestone.progress}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
