import { useGetPaymentHistoryQuery } from "@/store/api/pages/userSubscriptionApi";
import { format } from "date-fns";
import { Loader2, Download, CheckCircle, XCircle, Clock, CreditCard } from "lucide-react";
import { useState } from "react";

interface PaymentHistoryProps {
  limit?: number;
  showViewAll?: boolean;
}

// Custom Badge Component
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

// Custom Card Components
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`rounded-2xl border bg-gray-900/50 text-white shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

// Custom Button Component
const Button = ({ 
  children, 
  onClick, 
  variant = "default", 
  size = "default",
  disabled = false,
  className = ""
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm";
  disabled?: boolean;
  className?: string;
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-[#F97316] text-black hover:bg-[#F97316]/90",
    outline: "border border-gray-700 bg-transparent hover:bg-gray-800 text-white",
    ghost: "hover:bg-gray-800 text-white"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-sm"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default function PaymentHistory({ limit = 10, showViewAll = false }: PaymentHistoryProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetPaymentHistoryQuery({ page, limit });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "succeeded":
        return {
          icon: CheckCircle,
          text: "SUCCEEDED",
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/30"
        };
      case "pending":
        return {
          icon: Clock,
          text: "PENDING",
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500/30"
        };
      case "failed":
        return {
          icon: XCircle,
          text: "FAILED",
          color: "text-red-400",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500/30"
        };
      case "refunded":
        return {
          icon: CreditCard,
          text: "REFUNDED",
          color: "text-gray-400",
          bgColor: "bg-gray-500/20",
          borderColor: "border-gray-500/30"
        };
      default:
        return {
          icon: CreditCard,
          text: status.toUpperCase(),
          color: "text-gray-400",
          bgColor: "bg-gray-500/20",
          borderColor: "border-gray-500/30"
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#F97316]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-12 bg-red-500/10 rounded-lg">
        <XCircle className="w-12 h-12 mx-auto mb-3 text-red-500" />
        <p>Failed to load payment history. Please try again.</p>
      </div>
    );
  }

  const payments = data?.data?.payments || [];
  const pagination = data?.data?.pagination;

  return (
    <Card className="border-gray-800">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#F97316]" />
          Payment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-lg">No payment history found</p>
            <p className="text-sm text-gray-500 mt-2">
              Your payment transactions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => {
              const statusConfig = getStatusConfig(payment.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div
                  key={payment._id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-5 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-[#F97316]/30 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="space-y-2 mb-4 lg:mb-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold text-white text-lg">
                        {payment.planId?.plan_name || "Unknown Plan"}
                      </span>
                      <Badge className={`${statusConfig.bgColor} ${statusConfig.color} border ${statusConfig.borderColor}`}>
                        <StatusIcon className="w-3 h-3 mr-1 inline" />
                        {statusConfig.text}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      {format(new Date(payment.createdAt), "MMMM dd, yyyy • hh:mm a")}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      Transaction ID: {payment.stripe_payment_intent_id || "N/A"}
                    </div>
                    {payment.failure_message && (
                      <div className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg mt-1">
                        Error: {payment.failure_message}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between lg:justify-end gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        ${payment.amount?.toFixed(2) || "0.00"}
                      </div>
                      <div className="text-xs text-gray-500 uppercase">
                        {payment.payment_method || "card"}
                      </div>
                    </div>
                    {payment.receipt_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(payment.receipt_url, "_blank")}
                        className="text-[#F97316] hover:text-[#F97316]/80 hover:bg-[#F97316]/10"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Receipt
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8 pt-6 border-t border-gray-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrev}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 p-0 ${
                          pageNum === page 
                            ? "bg-[#F97316] text-black hover:bg-[#F97316]/90" 
                            : "border-gray-700 hover:bg-gray-800"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  Next
                </Button>
              </div>
            )}
            
            {/* Summary Section */}
            {payments.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Total Transactions:</span>
                  <span className="text-white font-semibold">{pagination?.total || 0}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-gray-400">Total Spent:</span>
                  <span className="text-white font-semibold">
                    ${payments.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}