"use client"
import { CATEGORIES, useCampaigns } from '@/app/hooks/useCampaings';
import { useIPFS } from '@/app/hooks/useIPFS';
import { CreateCampaign } from '@/app/types/Campaign';
import { Button, DatePicker, DateValue, Input, Select, SelectItem } from '@heroui/react';
import {
  AlertCircle,
  Calendar,
  Image,
  Info,
  Upload
} from 'lucide-react';
import React, { useState } from 'react';

export default function Page() {
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<number>();
  const [goal, setGoal] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { createCampaign } = useCampaigns(); // Hook para acceder al contexto de campañas
  const { uploadFile } = useIPFS();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const imageCID = await uploadFile(imageFile!);

      const endDateTime = new Date(endDate).getTime();

      const newCampaign: CreateCampaign = {
        title,
        description,
        imageCID: imageCID,
        goal: parseFloat(goal),
        deadline: endDateTime, // blockchain usa timestamp en segundos
        url: "",
        category: category!
      };
      const response = await createCampaign(newCampaign);
      if (response.error) {
        setError(response.error);
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);

    } catch (err) {
      console.error("❌ Error al crear campaña:", err);
      setError("Hubo un error al crear tu campaña. Por favor intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!title.trim()) {
        setError('Por favor ingresa un título para tu campaña');
        return false;
      }
      if (!category) {
        setError('Por favor selecciona una categoría');
        return false;
      }
      if (!goal || parseFloat(goal) <= 0) {
        setError('Por favor ingresa un monto válido como objetivo');
        return false;
      }
      if (!endDate) {
        setError('Por favor selecciona una fecha de finalización');
        return false;
      }

      const selectedDate = new Date(endDate);
      const today = new Date();
      if (selectedDate <= today) {
        setError('La fecha de finalización debe ser posterior a hoy');
        return false;
      }
    } else if (step === 2) {
      if (!description.trim()) {
        setError('Por favor ingresa una descripción breve');
        return false;
      }
      if (!image) {
        setError('Por favor selecciona una imagen para tu campaña');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImage(URL.createObjectURL(file!));
  };

  const handleDateChange = (value: DateValue | null) => {
    let jsDate: Date
    if (!value) return;
    if ('hour' in value) {
      jsDate = new Date(
        value.year,
        value.month - 1,
        value.day
      )
    } else {
      jsDate = new Date(value.year, value.month - 1, value.day)
    }
    setEndDate(jsDate.toISOString().split('T')[0]);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Crear Nueva Campaña</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              <span>1</span>
            </div>
            <div className={`h-1 w-12 sm:w-24 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'
              }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              <span>2</span>
            </div>
            <div className={`h-1 w-12 sm:w-24 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'
              }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              <span>3</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2 px-6">
          <span className="text-xs text-gray-600">Detalles</span>
          <span className="text-xs text-gray-600">Contenido</span>
          <span className="text-xs text-gray-600">Revisión</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Detalles de la Campaña</h2>

              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título de la Campaña*
                </label>
                <Input
                  variant='bordered'
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Ayuda para tratamiento médico"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría*
                </label>
                <Select
                  id="category"

                  selectedKeys={category ? new Set([category]) : new Set()}
                  onSelectionChange={(keys) => setCategory(Array.from(keys as Set<number>)[0] || 0)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Selecciona una categoría"
                >
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id}>{cat.name}</SelectItem>
                  ))}
                </Select>
              </div>

              <div className="mb-6">
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo de Recaudación ($)*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    type="number"
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    min="1"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Finalización*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <DatePicker
                    id="endDate"
                    onChange={handleDateChange}
                    isRequired
                    className="max-w-[284px]"
                    label="End date"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onPress={handleNextStep}
                  color='primary'
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Contenido de la Campaña</h2>

              <div className="mb-6">
                <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción Completa*
                </label>
                <textarea
                  id="fullDescription"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Explica detalladamente el propósito de la campaña, por qué necesitas los fondos y cómo se utilizarán"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen Principal*
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {image ? (
                    <div className="text-center">
                      <img
                        src={image}
                        alt="Vista previa"
                        className="mx-auto h-32 w-auto object-cover rounded-md"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        Imagen cargada correctamente
                      </p>
                      <Button
                        type="button"
                        onPress={() => setImage('')}
                        color='primary'
                      >
                        Cambiar imagen
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
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
                  color='secondary'>
                  Anterior
                </Button>
                <Button
                  type="button"
                  onPress={handleNextStep}
                  color='primary'
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Revisar y Confirmar</h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Detalles Básicos</h3>
                    <div className="bg-white rounded-md p-4 border border-gray-200">
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">Título</span>
                        <p className="font-medium">{title}</p>
                      </div>
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">Categoría</span>
                        <p className="font-medium">{category}</p>
                      </div>
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">Objetivo</span>
                        <p className="font-medium">${parseFloat(goal).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Fecha de finalización</span>
                        <p className="font-medium">{new Date(endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Imagen</h3>
                    <div className="bg-white rounded-md p-4 border border-gray-200">
                      <img
                        src={image}
                        alt="Vista previa"
                        className="h-32 w-full object-cover rounded-md"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción</h3>
                    <div className="bg-white rounded-md p-4 border border-gray-200">
                      <div>
                        <span className="text-xs text-gray-500">Descripción completa</span>
                        <p className="text-sm mt-1">{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                <Info className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Importante</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Al crear esta campaña, aceptas que todos los fondos recaudados y transacciones serán
                    registrados en la blockchain y serán completamente transparentes para los donantes.
                    Asegúrate de que toda la información proporcionada sea correcta.
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <Input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  Acepto los términos y condiciones y la política de privacidad de Donaré
                </label>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onPress={handlePrevStep}
                  color='secondary'
                  >
                  Anterior
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  color='primary'
              >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creando campaña...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Crear Campaña
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};