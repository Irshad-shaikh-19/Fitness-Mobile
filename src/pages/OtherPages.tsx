import {
  ArrowLeft,
  Briefcase,
  Newspaper,
  TrendingUp,
  Tv,
  Cookie,
  Building,
  FileText,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageTemplate({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0F14]/95 backdrop-blur-sm border-b border-gray-800">
        <span className="text-2xl font-bold text-[#F97316]">
          FITNESSFLICKS.COM
        </span>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </nav> */}

      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Icon className="w-10 h-10 text-[#F97316]" />
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
