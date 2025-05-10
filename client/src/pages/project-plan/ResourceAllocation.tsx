import { ResourceRole } from "@/types";

interface ResourceAllocationProps {
  resources: ResourceRole[];
}

export default function ResourceAllocation({ resources }: ResourceAllocationProps) {
  return (
    <div className="mt-8">
      <h4 className="text-lg font-medium text-gray-800 mb-4">Resource Allocation Table</h4>
      
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ALLOCATION</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NOTES</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resources.map((resource, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {resource.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {resource.allocation}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {resource.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
