import { FeasibilityFactor, FinancialData } from "@/types";
import { formatPercentage, getScoreColor, getScoreColorClass } from "@/lib/utils";

interface FinancialFeasibilityProps {
  score: number;
  factors: FeasibilityFactor[];
  financialData: FinancialData;
}

export default function FinancialFeasibility({ score, factors, financialData }: FinancialFeasibilityProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="flex-1 h-2 bg-blue-100 rounded-full">
          <div className={`h-2 rounded-full ${getScoreColor(score)}`} style={{ width: `${score}%` }}></div>
        </div>
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">Financial Feasibility Score: {formatPercentage(score)}</h3>
      <p className="text-gray-700 mb-4">
        The project has {score < 60 ? "critical" : score < 70 ? "significant" : score < 80 ? "moderate" : "minimal"} financial challenges that must be {score < 80 ? "addressed" : "monitored"}.
      </p>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">Key Recommendations:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {factors.slice(0, 2).flatMap(factor => factor.recommendations)}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Estimated Cost</p>
          <p className="text-lg font-semibold text-gray-800">{financialData.estimatedCost}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Projected ROI</p>
          <p className="text-lg font-semibold text-gray-800">{financialData.projectedRoi}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payback Period</p>
          <p className="text-lg font-semibold text-gray-800">{financialData.paybackPeriod}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColorClass(factor.score)}`}>
                    {formatPercentage(factor.score)}
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
