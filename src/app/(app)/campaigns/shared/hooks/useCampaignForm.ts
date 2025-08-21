"use client"

import { useCampaignFormContext } from '../context/CampaignFormContext';
import { useCampaigns } from '@/app/hooks/useCampaings';
import { useIPFS } from '@/app/hooks/useIPFS';
import { CreateCampaign, Campaign } from '@/app/types/Campaign';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Mock function to get campaign data
const mockGetCampaignById = async (id: string): Promise<Campaign> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock campaign data
  const mockCampaign: Campaign = {
    id: parseInt(id),
    title: 'Ayuda para tratamiento médico de María',
    description: 'María necesita ayuda urgente para su tratamiento médico. Tu donación puede hacer la diferencia.',
    fullDescription: 'María es una madre de familia que necesita ayuda urgente para su tratamiento médico. Hace unos meses le diagnosticaron una enfermedad que requiere tratamiento especializado y costoso. Tu donación puede hacer la diferencia en su vida y la de su familia.',
    category: 1, // Salud
    imageCID: 'QmExampleImageHash',
    goal: 5000,
    amountRaised: 1250,
    createdAt: new Date('2025-08-15'),
    endDate: new Date('2030-06-15'),
    daysLeft: 45,
    donors: 25,
    creator: 'María González',
    address: '0x742d35Cc6634C0532925a3b8D45C9e86C2',
    walletAddress: '0x742d35Cc6634C0532925a3b8D45C9e86C2',
    isVerified: true,
    status: 3 // Active
  };
  
  return mockCampaign;
};

export const useCampaignForm = () => {
  const {
    mode,
    campaignId,
    formData,
    currentStep,
    isSubmitting,
    isLoading,
    error,
    setFormData,
    setIsSubmitting,
    setIsLoading,
    setError,
    nextStep,
    prevStep,
    isCreateMode,
    isEditMode,
  } = useCampaignFormContext();
  
  const { createCampaign } = useCampaigns();
  const { uploadFile } = useIPFS();
  const router = useRouter();

  // Load campaign data on mount (only for edit mode)
  useEffect(() => {
    const loadCampaign = async () => {
      if (!isEditMode() || !campaignId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const campaign = await mockGetCampaignById(campaignId);
        
        // Convert campaign data to form format
        const endDateString = campaign.endDate.toISOString().split('T')[0];
        
        setFormData({
          title: campaign.title,
          category: campaign.category,
          goal: campaign.goal,
          endDate: endDateString,
          description: campaign.fullDescription || campaign.description,
          image: `https://ipfs.io/ipfs/${campaign.imageCID}`,
          imageFile: null,
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading campaign:', err);
        setError('Error al cargar los datos de la campaña');
        setIsLoading(false);
      }
    };

    loadCampaign();
  }, [campaignId, mode]);

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

      let imageCID = formData.image;
      
      // Handle image upload
      if (formData.imageFile) {
        imageCID = await uploadFile(formData.imageFile);
      } else if (isEditMode() && formData.image.includes('ipfs.io/ipfs/')) {
        // Extract CID from IPFS URL for edit mode
        imageCID = formData.image.split('/').pop() || formData.image;
      }

      const endDateTime = new Date(formData.endDate).getTime();

      const campaignData: CreateCampaign = {
        name: formData.title,
        description: formData.description,
        photo: imageCID,
        goal: formData.goal,
        endDate: endDateTime,
        url: "",
        category: Number(formData.category)
      };

      if (isCreateMode()) {
        const response = await createCampaign(campaignData);
        if (response.IsErr) {
          setError(response.AsErr.Error.message ?? "Error desconocido");
          setIsSubmitting(false);
          return;
        }
        console.log("✅ Campaña creada exitosamente:", response);
        const newCampaignId = response.Unwrap().id;
        router.push('/campaigns/create/confirmation?campaignId=' + newCampaignId);
      } else {
        // Edit mode - in reality you'd call updateCampaign(campaignId, campaignData)
        console.log("✅ Campaña actualizada exitosamente:", campaignData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Redirect back to campaign details
        router.push(`/campaigns/${campaignId}`);
      }
      
      setIsSubmitting(false);

    } catch (err) {
      console.error(`❌ Error al ${isCreateMode() ? 'crear' : 'actualizar'} campaña:`, err);
      setError(`Hubo un error al ${isCreateMode() ? 'crear' : 'actualizar'} tu campaña. Por favor intenta nuevamente.`);
      setIsSubmitting(false);
    }
  };

  return {
    mode,
    campaignId,
    formData,
    currentStep,
    isSubmitting,
    isLoading,
    error,
    validateStep,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    isCreateMode,
    isEditMode,
  };
};
