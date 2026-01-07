import { Loader2 } from "lucide-react";

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 text-[#F97316] animate-spin mb-6" />
      <h1 className="text-2xl font-bold mb-2">Setting up your Standard...</h1>
      <p className="text-gray-400">Redirecting to secure checkout...</p>
    </div>
  );
}
