"use client"

import { useEditCampaignContext } from '../context/EditCampaignContext';
// import { useCampaigns } from '@/app/hooks/useCampaings'; // In a real app, you'd use this for updateCampaign
import { useIPFS } from '@/app/hooks/useIPFS';
import { CreateCampaign, Campaign } from '@/app/types/Campaign';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Mock function to get campaign data
const mockGetCampaignById = async (id: string): Promise<Campaign> => {
  // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000));
  
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
    createdAt: new Date('2024-01-15'),
    endDate: new Date('2024-06-15'),
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

export const useEditCampaigns = () => {
  const {
    formData,
    currentStep,
    isSubmitting,
    isLoading,
    error,
    campaignId,
    setFormData,
    setIsSubmitting,
    setIsLoading,
    setError,
    nextStep,
    prevStep,
  } = useEditCampaignContext();
  
  // const { createCampaign } = useCampaigns(); // In a real app, you'd have updateCampaign
  const { uploadFile } = useIPFS();
  const router = useRouter();

  // Load campaign data on mount
  useEffect(() => {
    const loadCampaign = async () => {
      try {
        setIsLoading(true);
        const campaign = await mockGetCampaignById(campaignId);
        console.log("📄 Datos de campaña cargados:", campaign);
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

    if (campaignId) {
      loadCampaign();
    }
  }, [campaignId, setFormData, setIsLoading, setError]);

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
      
      // Only upload new image if a new file was selected
      if (formData.imageFile) {
        imageCID = await uploadFile(formData.imageFile);
      } else if (formData.image.includes('ipfs.io/ipfs/')) {
        // Extract CID from IPFS URL
        imageCID = formData.image.split('/').pop() || formData.image;
      }

      const endDateTime = new Date(formData.endDate).getTime();

      // In a real app, this would be updateCampaign instead of createCampaign
      const updatedCampaign: CreateCampaign = {
        name: formData.title,
        description: formData.description,
        photo: imageCID,
        goal: formData.goal,
        endDate: endDateTime,
        url: "",
        category: Number(formData.category)
      };

      // Mock update - in reality you'd call updateCampaign(campaignId, updatedCampaign)
      console.log("✅ Campaña actualizada exitosamente:", updatedCampaign);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect back to campaign details or dashboard
      router.push(`/campaigns/${campaignId}`);
      setIsSubmitting(false);

    } catch (err) {
      console.error("❌ Error al actualizar campaña:", err);
      setError("Hubo un error al actualizar tu campaña. Por favor intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    currentStep,
    isSubmitting,
    isLoading,
    error,
    validateStep,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
  };
};
