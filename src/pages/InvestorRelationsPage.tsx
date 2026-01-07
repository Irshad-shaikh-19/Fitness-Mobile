import { TrendingUp } from "lucide-react";
import { PageTemplate } from "./OtherPages";

export function InvestorRelationsPage() {
  return (
    <PageTemplate title="Investor Relations" icon={TrendingUp}>
      <p className="text-lg text-gray-300 mb-8">
        FitnessFlicks is committed to transparency.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
          <p className="text-4xl font-bold text-[#F97316] mb-2">10M+</p>
          <p className="text-gray-400">Active Subscribers</p>
        </div>
        <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
          <p className="text-4xl font-bold text-[#F97316] mb-2">190+</p>
          <p className="text-gray-400">Countries Served</p>
        </div>
      </div>
    </PageTemplate>
  );
}
