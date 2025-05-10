import { RiskItem } from "@/types";

interface RiskAssessmentProps {
  risks: RiskItem[];
}

export default function RiskAssessment({ risks }: RiskAssessmentProps) {
  return (
    <div className="mt-8">
      <h4 className="text-lg font-medium mb-4">Risk Assessment</h4>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RISK CATEGORY</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PROBABILITY</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IMPACT</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MITIGATION STRATEGY</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {risks.map((risk, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {risk.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {risk.probability}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {risk.impact}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {risk.mitigationStrategy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
