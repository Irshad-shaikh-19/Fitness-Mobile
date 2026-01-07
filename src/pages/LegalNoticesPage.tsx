import { FileText } from "lucide-react";
import { PageTemplate } from "./OtherPages";

export function LegalNoticesPage() {
  return (
    <PageTemplate title="Legal Notices" icon={FileText}>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Copyright Notice</h2>
          <p className="text-gray-300">
            All content on FitnessFlicks is the property of FitnessFlicks, Inc.
            and is protected by international copyright laws.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Trademarks</h2>
          <p className="text-gray-300">
            FitnessFlicks and the FitnessFlicks logo are trademarks of
            FitnessFlicks, Inc.
          </p>
        </section>
      </div>
    </PageTemplate>
  );
}
