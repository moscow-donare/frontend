"use client"
import React, { useState, useEffect } from 'react';
import {Info, AlertCircle, Image as ImageIcon, Calendar, Upload} from 'lucide-react';
import { useCampaigns } from '../../context/CampaignContext';
import { useRouter } from 'next/navigation';
import { useWeb3AuthUser } from "@web3auth/modal/react"; // Import useWeb3AuthUser

export default function Page(){
  const router = useRouter();
  const { addCampaign, campaigns } = useCampaigns(); // Get campaigns from context
  const { userInfo } = useWeb3AuthUser(); // Get user info
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [fullDescription, setFullDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]); // Changed to array for multiple images
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasExistingCampaign, setHasExistingCampaign] = useState<boolean>(false); // New state for existing campaign

  const categories = ['Salud', 'Educación', 'Emergencia', 'Rifa', 'Proyecto', 'Otros'];

  // Simulate checking for an existing campaign based on the logged-in user
  useEffect(() => {
    if (userInfo?.name) {
      // For demonstration, assume 'Juan Pérez' has an existing campaign
      const userHasCampaign = campaigns.some(campaign => campaign.creator === userInfo.name);
      setHasExistingCampaign(userHasCampaign);
    }
  }, [userInfo, campaigns]);

  if (hasExistingCampaign) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ya tienes una campaña activa o en revisión</h2>
          <p className="text-gray-600 mb-6">
            Actualmente solo se permite tener una campaña activa o en revisión por usuario.
            Puedes administrar tu campaña existente desde tu Panel de Control.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Ir a mi Panel de Control
          </button>
        </div>
      </div>
    );
  }

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
      today.setHours(0, 0, 0, 0); // Normalize today's date
      if (selectedDate <= today) {
        setError('La fecha de finalización debe ser posterior a hoy');
        return false;
      }
    } else if (step === 2) {
      if (!description.trim()) {
        setError('Por favor ingresa una descripción breve');
        return false;
      }
      if (!fullDescription.trim()) {
        setError('Por favor ingresa una descripción completa');
        return false;
      }
      if (images.length === 0) { // Check if at least one image is selected
        setError('Por favor selecciona al menos una imagen para tu campaña');
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
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length && newImages.length < 3; i++) { // Limit to 3 images
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImages.push(reader.result as string);
            if (newImages.length === Math.min(files.length, 3)) { // Ensure all selected files (up to 3) are processed
              setImages(prevImages => [...prevImages, ...newImages].slice(0, 3)); // Add new images, limit total to 3
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    setIsSubmitting(true);

    // Calcula los días restantes entre hoy y la fecha de finalización
    const endDateTime = new Date(endDate).getTime();
    const todayTime = new Date().getTime();
    const daysDiff = Math.ceil((endDateTime - todayTime) / (1000 * 60 * 60 * 24));

    // En una aplicación real, esto crearía la campaña en la blockchain
    setTimeout(() => {
      try {
        const newCampaign = {
          id: Date.now().toString(), // ID único para la campaña
          title,
          category,
          goal: parseFloat(goal),
          endDate: new Date(endDate),
          description,
          fullDescription,
          imageUrl: images[0] || '', // Usa la primera imagen para la vista previa principal
          createdAt: new Date(),
          daysLeft: daysDiff,
          amountRaised: 0,
          donors: 0,
          creator: userInfo?.name || 'Usuario Anónimo', // Usa la información real del usuario o un fallback
          walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', // Dirección de cartera de ejemplo
          isVerified: false // La campaña empieza sin verificar
        };

        const redirectUrl = `/campaigns/create/confirmation?campaignId=${newCampaign.id}`;
        console.log("Intentando redirigir a:", redirectUrl); // Línea de depuración para ver la URL de redirección
        addCampaign(newCampaign); // Añade la nueva campaña al contexto
        router.push(redirectUrl); // Redirige a la nueva página de confirmación
      } catch (err) {
        setError('Hubo un error al crear tu campaña. Por favor intenta nuevamente.');
        setIsSubmitting(false);
      }
    }, 1500); // Simula un retraso de 1.5 segundos para el procesamiento
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Crear Nueva Campaña</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <span>1</span>
            </div>
            <div className={`h-1 w-12 sm:w-24 ${
              step >= 2 ? 'bg-teal-600' : 'bg-gray-200'
            }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <span>2</span>
            </div>
            <div className={`h-1 w-12 sm:w-24 ${
              step >= 3 ? 'bg-teal-600' : 'bg-gray-200'
            }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
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
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Ej: Ayuda para tratamiento médico"
                  required // Added required attribute
                />
              </div>

              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría*
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required // Added required attribute
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo de Recaudación ($)*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    min="1"
                    required // Added required attribute
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
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    required // Added required attribute
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Contenido de la Campaña</h2>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción Breve*
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Describe tu campaña en una frase corta"
                  required // Added required attribute
                />
                <p className="mt-1 text-xs text-gray-500">
                  Esta descripción aparecerá en las tarjetas de campaña (máx. 100 caracteres)
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción Completa*
                </label>
                <textarea
                  id="fullDescription"
                  rows={6}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Explica detalladamente el propósito de la campaña, por qué necesitas los fondos y cómo se utilizarán"
                  required // Added required attribute
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imágenes Principales* (hasta 3)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {images.length > 0 ? (
                    <div className="text-center w-full">
                      <div className="flex flex-wrap justify-center gap-4 mb-4">
                        {images.map((imgSrc, index) => (
                          <div key={index} className="relative">
                            <img
                              src={imgSrc}
                              alt={`Vista previa ${index + 1}`}
                              className="h-32 w-auto object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                              title="Eliminar imagen"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                      {images.length < 3 && (
                         <label
                           htmlFor="file-upload"
                           className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500 px-4 py-2"
                         >
                           <span>Agregar más imágenes</span>
                           <input
                             id="file-upload"
                             name="file-upload"
                             type="file"
                             className="sr-only"
                             accept="image/*"
                             onChange={handleImageUpload}
                             multiple // Allow multiple file selection
                           />
                         </label>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                        >
                          <span>Subir una imagen</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageUpload}
                            multiple // Allow multiple file selection
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
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Siguiente
                </button>
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
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Imágenes</h3>
                    <div className="bg-white rounded-md p-4 border border-gray-200">
                      {images.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {images.map((imgSrc, index) => (
                            <img
                              key={index}
                              src={imgSrc}
                              alt={`Vista previa ${index + 1}`}
                              className="h-24 w-auto object-cover rounded-md"
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No hay imágenes seleccionadas.</p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción</h3>
                    <div className="bg-white rounded-md p-4 border border-gray-200">
                      <div className="mb-3">
                        <span className="text-xs text-gray-500">Descripción breve</span>
                        <p className="font-medium">{description}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Descripción completa</span>
                        <p className="text-sm mt-1">{fullDescription}</p>
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
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  Acepto los términos y condiciones y la política de privacidad de Donaré
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Anterior
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center"
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
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
