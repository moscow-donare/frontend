"use client"

import { useCreateCampaignContext } from '../context/CreateCampaignContext';
import { useCampaigns } from '@/app/hooks/useCampaings';
import { useIPFS } from '@/app/hooks/useIPFS';
import { CreateCampaign } from '@/app/types/Campaign';
import { useRouter } from 'next/navigation';

export const useCreateCampaigns = () => {
  const {
    formData,
    currentStep,
    isSubmitting,
    error,
    setIsSubmitting,
    setError,
    nextStep,
    prevStep,
  } = useCreateCampaignContext();
  
  const { createCampaign } = useCampaigns();
  const { uploadFile } = useIPFS();
  const router = useRouter();

  const validateStep = (step: number = currentStep): boolean => {
    if (step === 1) {
      if (!formData.title.trim()) {
        setError('Por favor ingresa un título para tu campaña');
        return false;
      }
      if (!formData.category) {
        setError('Por favor selecciona una categoría');
        return false;
      }
      if (formData.goal <= 0) {
        setError('Por favor ingresa un monto válido como objetivo');
        return false;
      }
      if (!formData.endDate) {
        setError('Por favor selecciona una fecha de finalización');
        return false;
      }

      const selectedDate = new Date(formData.endDate);
      const today = new Date();
      if (selectedDate <= today) {
        setError('La fecha de finalización debe ser posterior a hoy');
        return false;
      }
    } else if (step === 2) {
      if (!formData.description.trim()) {
        setError('Por favor ingresa una descripción breve');
        return false;
      }
      if (!formData.image) {
        setError('Por favor selecciona una imagen para tu campaña');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      nextStep();
    }
  };

  const handlePrevStep = () => {
    prevStep();
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const imageCID = await uploadFile(formData.imageFile!);
      const endDateTime = new Date(formData.endDate).getTime();

      const newCampaign: CreateCampaign = {
        title: formData.title,
        description: formData.description,
        imageCID: imageCID,
        goal: formData.goal,
        deadline: endDateTime,
        url: "",
        category: formData.category!
      };

      const response = await createCampaign(newCampaign);
      if (response.error) {
        setError(response.error);
        setIsSubmitting(false);
        return;
      }
      console.log("✅ Campaña creada exitosamente:", response);
      // Redirect to confirmation page or campaigns list
      router.push('/campaigns/create/confirmation?campaignId=' + response.data.id);
      setIsSubmitting(false);

    } catch (err) {
      console.error("❌ Error al crear campaña:", err);
      setError("Hubo un error al crear tu campaña. Por favor intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    currentStep,
    isSubmitting,
    error,
    validateStep,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
  };
};
