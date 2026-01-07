import { Tv } from "lucide-react";
import { PageTemplate } from "./OtherPages";

export function WaysToWatchPage() {
  const devices = [
    { name: "Smart TVs", description: "Samsung, LG, Sony, and more" },
    { name: "Streaming Devices", description: "Chromecast, Apple TV, Roku" },
    { name: "Mobile Devices", description: "iOS and Android" },
    { name: "Computers", description: "All major browsers" },
  ];

  return (
    <PageTemplate title="Ways to Watch" icon={Tv}>
      <p className="text-lg text-gray-300 mb-8">
        Watch FitnessFlicks anywhere, anytime.
      </p>
      <div className="space-y-4">
        {devices.map((device, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
          >
            <h3 className="text-xl font-bold mb-2">{device.name}</h3>
            <p className="text-gray-400">{device.description}</p>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
