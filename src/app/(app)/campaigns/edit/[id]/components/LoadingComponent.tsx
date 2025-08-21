"use client"

import { Spinner } from '@heroui/react';

export const LoadingComponent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <Spinner size="lg" color="primary" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          Cargando datos de la campaña...
        </h2>
        <p className="mt-2 text-gray-600">
          Por favor espera mientras obtenemos la información de tu campaña.
        </p>
      </div>
    </div>
  );
};
