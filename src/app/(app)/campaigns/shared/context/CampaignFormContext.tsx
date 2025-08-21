"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CampaignFormMode = 'create' | 'edit';

export interface CampaignFormData {
  title: string;
  category?: number;
  goal: number;
  endDate: string;
  description: string;
  image: string;
  imageFile: File | null;
}

export interface CampaignFormContextType {
  // Mode and ID
  mode: CampaignFormMode;
  campaignId?: string;
  
  // Form data
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  
  // Campaign loading (only for edit mode)
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Steps
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  
  // UI states
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  
  // Form update functions
  updateTitle: (title: string) => void;
  updateCategory: (category: number) => void;
  updateGoal: (goal: number) => void;
  updateEndDate: (endDate: string) => void;
  updateDescription: (description: string) => void;
  updateImage: (image: string, file: File | null) => void;
  
  // Step navigation
  nextStep: () => void;
  prevStep: () => void;
  
  // Helper methods
  isCreateMode: () => boolean;
  isEditMode: () => boolean;
}

const CampaignFormContext = createContext<CampaignFormContextType | undefined>(undefined);

export const useCampaignFormContext = () => {
  const context = useContext(CampaignFormContext);
  if (!context) {
    throw new Error('useCampaignFormContext must be used within a CampaignFormProvider');
  }
  return context;
};

interface CampaignFormProviderProps {
  children: ReactNode;
  mode: CampaignFormMode;
  campaignId?: string;
}

export const CampaignFormProvider: React.FC<CampaignFormProviderProps> = ({ 
  children, 
  mode, 
  campaignId 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    category: undefined,
    goal: 0,
    endDate: '',
    description: '',
    image: '',
    imageFile: null,
  });

  // Form update functions
  const updateTitle = (title: string) => {
    setFormData(prev => ({ ...prev, title }));
  };

  const updateCategory = (category: number) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const updateGoal = (goal: number) => {
    setFormData(prev => ({ ...prev, goal }));
  };

  const updateEndDate = (endDate: string) => {
    setFormData(prev => ({ ...prev, endDate }));
  };

  const updateDescription = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
  };

  const updateImage = (image: string, file: File | null) => {
    setFormData(prev => ({ ...prev, image, imageFile: file }));
  };

  // Step navigation
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Helper methods
  const isCreateMode = () => mode === 'create';
  const isEditMode = () => mode === 'edit';

  const value: CampaignFormContextType = {
    mode,
    campaignId,
    formData,
    setFormData,
    isLoading,
    setIsLoading,
    currentStep,
    setCurrentStep,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    updateTitle,
    updateCategory,
    updateGoal,
    updateEndDate,
    updateDescription,
    updateImage,
    nextStep,
    prevStep,
    isCreateMode,
    isEditMode,
  };

  return (
    <CampaignFormContext.Provider value={value}>
      {children}
    </CampaignFormContext.Provider>
  );
};
