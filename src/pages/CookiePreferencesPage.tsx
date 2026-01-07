import { Cookie } from "lucide-react";
import { PageTemplate } from "./OtherPages";
import { Button } from "@/components";

export function CookiePreferencesPage() {
  return (
    <PageTemplate title="Cookie Preferences" icon={Cookie}>
      <p className="text-lg text-gray-300 mb-8">
        Manage how we use cookies on your device.
      </p>
      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Essential Cookies</h3>
            <span className="text-sm text-gray-400">Always Active</span>
          </div>
          <p className="text-gray-400">
            These cookies are necessary for the website to function.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Performance Cookies</h3>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
          <p className="text-gray-400">
            These cookies help us improve site performance.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
