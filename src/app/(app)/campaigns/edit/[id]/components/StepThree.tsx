"use client"

import { PriceFormatter } from '@/app/utils/PriceFormatter';
import { CATEGORY_MAPPER } from '@/shared/const/Categories';
import { Button } from '@heroui/react';
import { Info, Save } from 'lucide-react';
import React from 'react';
import { useEditCampaignContext } from '../context/EditCampaignContext';
import { useEditCampaigns } from '../hooks/useEditCampaigns';

export const StepThree: React.FC = () => {
  const { formData } = useEditCampaignContext();
  const { handlePrevStep, handleSubmit, isSubmitting } = useEditCampaigns();

  const categoryName = formData.category ? CATEGORY_MAPPER(formData.category) : '';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Revisar Cambios y Confirmar</h2>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Detalles Básicos</h3>
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <div className="mb-2">
                <span className="text-xs text-gray-500">Título</span>
                <p className="font-medium">{formData.title}</p>
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-500">Categoría</span>
                <p className="font-medium">{categoryName}</p>
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-500">Objetivo</span>
                <p className="font-medium">{PriceFormatter(formData.goal)}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Fecha de finalización</span>
                <p className="font-medium">
                  {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : ''}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Imagen</h3>
            <div className="bg-white rounded-md p-4 border border-gray-200">
              {formData.image && (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.image}
                    alt="Vista previa"
                    className="h-32 w-full object-cover rounded-md"
                  />
                  {formData.imageFile && (
                    <p className="text-xs text-green-600 mt-2">✓ Nueva imagen seleccionada</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción</h3>
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <div>
                <p className="text-sm mt-1">{formData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-md flex items-start">
        <Info className="h-5 w-5 text-warning-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-warning-800">Importante</h4>
          <p className="text-sm text-warning-700 mt-1">
            Al actualizar esta campaña, los cambios serán registrados en la blockchain y serán
            visibles para todos los donantes. Asegúrate de que toda la información sea correcta
            antes de confirmar los cambios.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex justify-between">
          <Button
            type="button"
            onPress={handlePrevStep}
            color="secondary"
            variant="bordered"
            size="lg"
            className="px-8"
          >
            Anterior
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            color="primary"
            size="lg"
            className="px-8"
            isLoading={isSubmitting}
            startContent={!isSubmitting ? <Save className="h-4 w-4" /> : null}
          >
            {isSubmitting ? 'Guardando cambios...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </div>
  );
};
