"use client"

import { Card, CardBody } from '@heroui/react';
import { ErrorAlert } from './components/ErrorAlert';
import { ProgressSteps } from './components/ProgressSteps';
import { StepOne } from './components/StepOne';
import { StepThree } from './components/StepThree';
import { StepTwo } from './components/StepTwo';
import { useCreateCampaignContext } from './context/CreateCampaignContext';

export default function CreateCampaignContent() {
  const { currentStep, error } = useCreateCampaignContext();

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Crear Nueva Campaña
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