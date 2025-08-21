"use client"

import { useCampaignFormContext } from '../context/CampaignFormContext';
import { useCampaignForm } from '../hooks/useCampaignForm';
import { Button, Textarea, Input } from '@heroui/react';
import { Image as ImageIcon } from 'lucide-react';
import React from 'react';

export const StepTwo: React.FC = () => {
  const {
    formData,
    updateDescription,
    updateImage,
    isCreateMode,
    isEditMode,
  } = useCampaignFormContext();
  
  const { handleNextStep, handlePrevStep } = useCampaignForm();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const imageUrl = URL.createObjectURL(file);
    updateImage(imageUrl, file);
  };

  const handleRemoveImage = () => {
    updateImage('', null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        {isCreateMode() ? 'Contenido de la Campaña' : 'Editar Contenido de la Campaña'}
      </h2>

      <div className="mb-6">
        <Textarea
          id="fullDescription"
          variant="bordered"
          isRequired
          label="Descripción Completa"
          labelPlacement='outside'
          minRows={6}
          value={formData.description}
          onChange={(e) => updateDescription(e.target.value)}
          placeholder="Explica detalladamente el propósito de la campaña, por qué necesitas los fondos y cómo se utilizarán"
          className="mt-1"
          size="lg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagen Principal <b className='text-red-500'>*</b>
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {formData.image ? (
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.image}
                alt="Vista previa"
                className="mx-auto h-32 w-auto object-cover rounded-md"
              />
              <p className="mt-2 text-sm text-gray-600">
                {isEditMode() && formData.imageFile 
                  ? 'Nueva imagen cargada' 
                  : isEditMode() 
                    ? 'Imagen actual de la campaña'
                    : 'Imagen cargada correctamente'
                }
              </p>
              <Button
                type="button"
                onPress={handleRemoveImage}
                color="secondary"
                variant="bordered"
                size="sm"
                className="mt-2"
              >
                Cambiar imagen
              </Button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <span>Subir una imagen</span>
                  <Input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF hasta 10MB
              </p>
            </div>
          )}
        </div>
      </div>

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
          type="button"
          onPress={handleNextStep}
          color="primary"
          size="lg"
          className="px-8"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
