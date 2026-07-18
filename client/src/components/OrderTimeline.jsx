function OrderTimeline({ currentStatus }) {
  const steps = ["Pending", "Processing", "Shipped", "Delivered"];
  const isCancelled = currentStatus === "Cancelled";

  const currentIndex = steps.indexOf(currentStatus);

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600 font-semibold">
          This order has been cancelled
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isCompleted
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <p
                className={`text-xs mt-2 text-center ${
                  isCompleted ? "text-gray-800 font-medium" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>

            {!isLast && (
              <div
                className={`flex-1 h-1 mx-2 mb-6 rounded ${
                  index < currentIndex ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderTimeline;
