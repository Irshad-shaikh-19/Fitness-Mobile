import { Building } from "lucide-react";
import { PageTemplate } from "./OtherPages";

export function CorporateInfoPage() {
  return (
    <PageTemplate title="Corporate Information" icon={Building}>
      <div className="space-y-8">
        <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
          <p className="text-gray-300 mb-2">
            <strong>Company Name:</strong> FitnessFlicks, Inc.
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Founded:</strong> 2020
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Headquarters:</strong> Los Angeles, California
          </p>
          <p className="text-gray-300">
            <strong>CEO:</strong> Jane Smith
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
