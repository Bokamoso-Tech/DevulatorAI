import { FeasibilityFactor } from "@/types";
import { formatPercentage } from "@/lib/utils";

interface TechnicalFeasibilityProps {
  score: number;
  factors: FeasibilityFactor[];
}

export default function TechnicalFeasibility({ score, factors }: TechnicalFeasibilityProps) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-1">Technical Feasibility Score: {score}%</h3>
      
      <div className="flex items-center mb-4">
        <div className="flex-1 h-2 bg-blue-100 rounded-full">
          <div className="h-2 rounded-full bg-amber-500" style={{ width: `${score}%` }}></div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">
        The project has significant technical challenges that must be carefully managed.
      </p>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">Key Recommendations:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {factors.slice(0, 4).map((factor, index) => (
            <li key={index}>{factor.recommendations[0]}</li>
          ))}
        </ul>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Analysis</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendations</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {factors.map((factor, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {factor.factor}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${factor.score >= 80 ? 'bg-green-100 text-green-800' : 
                      factor.score >= 70 ? 'bg-blue-100 text-blue-800' : 
                      factor.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {factor.score}%
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {factor.analysis}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  <ul className="list-disc pl-4">
                    {factor.recommendations.map((rec, recIndex) => (
                      <li key={recIndex}>{rec}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
