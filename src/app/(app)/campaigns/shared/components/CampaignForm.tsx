"use client"

import { Card, CardBody } from '@heroui/react';
import { ErrorAlert } from './ErrorAlert';
import { ProgressSteps } from './ProgressSteps';
import { StepOne } from './StepOne';
import { StepThree } from './StepThree';
import { StepTwo } from './StepTwo';
import { useCampaignFormContext } from '../context/CampaignFormContext';

export const CampaignForm: React.FC = () => {
  const { currentStep, error, isCreateMode } = useCampaignFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  };

//   if (isLoading) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <Spinner size="lg" color="primary" />
//             <p className="mt-4 text-gray-600">Cargando datos de la campaña...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {isCreateMode() ? 'Crear Nueva Campaña' : 'Editar Campaña'}
      </h1>

      <ProgressSteps currentStep={currentStep} />

      <Card className="shadow-lg">
        <CardBody className="p-8">
          <ErrorAlert error={error} />
          {renderStep()}
        </CardBody>
      </Card>
    </div>
  );
};
