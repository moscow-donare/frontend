"use client"

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: '' },
    { number: 2, label: '' },
    { number: 3, label: '' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.number
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <span>{step.number}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-12 sm:w-24 ${
                  currentStep >= step.number + 1 ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 px-6">
        {steps.map((step) => (
          <span key={step.number} className="text-xs text-gray-600">
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};
