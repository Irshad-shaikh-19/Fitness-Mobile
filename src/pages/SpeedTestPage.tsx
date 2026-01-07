import { Button } from "@/components";
import { PageTemplate } from "./OtherPages";
import { Gauge } from "lucide-react";

export function SpeedTestPage() {
  return (
    <PageTemplate title="Speed Test" icon={Gauge}>
      <p className="text-lg text-gray-300 mb-8">
        Test your internet connection speed.
      </p>
      <div className="p-12 rounded-xl bg-gray-900/50 border border-gray-800 text-center mb-8">
        <p className="text-6xl font-bold text-[#F97316] mb-4">--</p>
        <p className="text-xl text-gray-400">Mbps</p>
        <Button className="mt-6 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-bold">
          Start Speed Test
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-gray-900/30 border border-gray-800">
          <p className="font-bold">Standard Quality</p>
          <p className="text-gray-400">3 Mbps</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900/30 border border-gray-800">
          <p className="font-bold">HD Quality</p>
          <p className="text-gray-400">5 Mbps</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900/30 border border-gray-800">
          <p className="font-bold">4K Ultra HD</p>
          <p className="text-gray-400">25 Mbps</p>
        </div>
      </div>
    </PageTemplate>
  );
}
