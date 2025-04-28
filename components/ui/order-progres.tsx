import { CheckIcon } from "lucide-react";

interface OrderProgressProps {
  status: string;
}

const statusSteps = ["pending", 'processing', "shipped", "delivered"];

export function OrderProgress({ status }: OrderProgressProps) {
  const currentStep = statusSteps.indexOf(status.toLowerCase());
  const isCancelled = status.toLowerCase() === "cancelled";
  const isReturned = status.toLowerCase() === "returned";

  if (isCancelled || isReturned) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className={`px-4 py-1 rounded-full text-sm font-medium ${
          isCancelled 
            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
        }`}>
          {status}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {statusSteps.map((step, index) => (
          <div
            key={step}
            className={`flex flex-col items-center ${
              index <= currentStep ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 bg-gray-50 dark:bg-gray-800"
              }`}
            >
              {index < currentStep ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <span className="text-sm">{index + 1}</span>
              )}
            </div>
            <span className="text-xs mt-1 font-medium capitalize">{step}</span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
        <div
          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{
            width: `${(currentStep / (statusSteps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}