"use client";

import { useCampaignFormContext } from "../context/CampaignFormContext";
import { useCampaigns } from "@/app/hooks/useCampaings";
import { useIPFS } from "@/app/hooks/useIPFS";
import { CreateCampaign } from "@/app/types/Campaign";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

// Mock function to get campaign data
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

  const { createCampaign, getCampaignById, updateCampaign } = useCampaigns();
  const { uploadFile } = useIPFS();
  const router = useRouter();

  const loadCampaign = useCallback(async () => {
    if (!isEditMode() || !campaignId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getCampaignById(Number(campaignId));
      console.log("📄 Datos de campaña cargados:", response);
      
      if (response.IsErr) {
        throw new Error(response.AsErr.Error.message);
      }
      
      const campaign = response.Unwrap();
      // Convert campaign data to form format
      let endDateString: string;

      // Handle different types of endDate that might come from the API
      if (campaign.endDate instanceof Date) {
        // If it's already a Date object
        endDateString = campaign.endDate.toISOString().split("T")[0];
      } else if (typeof campaign.endDate === "number") {
        // If it's a timestamp, convert to Date first
        endDateString = new Date(campaign.endDate).toISOString().split("T")[0];
      } else {
        // If it's a string, handle it appropriately
        const dateStr = campaign.endDate as string;
        if (dateStr.includes("T")) {
          endDateString = dateStr.split("T")[0];
        } else {
          endDateString = dateStr;
        }
      }
      setFormData({
        title: campaign.name,
        category: String(campaign.category),
        goal: campaign.goal,
        endDate: endDateString,
        description: campaign.description,
        // image: `https://ipfs.io/ipfs/${campaign.imageCID}`,
        image: campaign.photo,
        imageFile: null,
      });
    } catch (err) {
      console.error("Error loading campaign:", err);
      setError("Error al cargar los datos de la campaña");
      setIsLoading(false);
    }
  }, [campaignId, mode, isEditMode, getCampaignById, setIsLoading, setFormData, setError]);

  useEffect(() => {
    // Solo cargar una vez cuando el componente se monta en modo edición
    if (isEditMode() && campaignId && !formData.title) {
      loadCampaign();
    }
  }, [campaignId]);

  const validateStep = (step: number = currentStep): boolean => {
    if (step === 1) {
      if (!formData.title.trim()) {
        setError("Por favor ingresa un título para tu campaña");
        return false;
      }
      if (!formData.category) {
        setError("Por favor selecciona una categoría");
        return false;
      }
      if (formData.goal <= 0) {
        setError("Por favor ingresa un monto válido como objetivo");
        return false;
      }
      if (!formData.endDate) {
        setError("Por favor selecciona una fecha de finalización");
        return false;
      }

      const selectedDate = new Date(formData.endDate);
      const today = new Date();
      if (selectedDate <= today) {
        setError("La fecha de finalización debe ser posterior a hoy");
        return false;
      }
    } else if (step === 2) {
      if (!formData.description.trim()) {
        setError("Por favor ingresa una descripción breve");
        return false;
      }
      if (!formData.image) {
        setError("Por favor selecciona una imagen para tu campaña");
        return false;
      }
    }

    setError("");
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
      } else if (isEditMode() && formData.image.includes("ipfs.io/ipfs/")) {
        // Extract CID from IPFS URL for edit mode
        imageCID = formData.image.split("/").pop() || formData.image;
      }

      const endDateTime = new Date(formData.endDate).getTime();
      const campaignData: CreateCampaign = {
        name: formData.title,
        description: formData.description,
        photo: imageCID,
        goal: formData.goal,
        endDate: endDateTime,
        url: "",
        category: Number(formData.category),
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
        router.push(
          "/campaigns/create/confirmation?campaignId=" + newCampaignId
        );
      } else {
        // Edit mode - in reality you'd call updateCampaign(campaignId, campaignData)
        console.log("✅ Campaña actualizada exitosamente:", campaignData);
        console.log(formData);
        console.log("ID de campaña:", campaignId);
        const response = await updateCampaign(
          Number(campaignId),
          campaignData
        );
        console.log("Respuesta de actualización:", response);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Redirect back to campaign details
        // router.push(`/campaigns/${campaignId}`);
      }

      setIsSubmitting(false);
    } catch (err) {
      console.error(
        `❌ Error al ${isCreateMode() ? "crear" : "actualizar"} campaña:`,
        err
      );
      setError(
        `Hubo un error al ${
          isCreateMode() ? "crear" : "actualizar"
        } tu campaña. Por favor intenta nuevamente.`
      );
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
