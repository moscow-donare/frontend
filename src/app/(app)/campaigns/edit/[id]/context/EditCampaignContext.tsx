"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface EditCampaignFormData {
  title: string;
  category?: number;
  goal: number;
  endDate: string;
  description: string;
  image: string;
  imageFile: File | null;
}

export interface EditCampaignContextType {
  // Form data
  formData: EditCampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditCampaignFormData>>;
  
  // Campaign loading
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
  
  // Campaign ID
  campaignId: string;
  setCampaignId: React.Dispatch<React.SetStateAction<string>>;
  
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
}

const EditCampaignContext = createContext<EditCampaignContextType | undefined>(undefined);

export const useEditCampaignContext = () => {
  const context = useContext(EditCampaignContext);
  if (!context) {
    throw new Error('useEditCampaignContext must be used within an EditCampaignProvider');
  }
  return context;
};

interface EditCampaignProviderProps {
  children: ReactNode;
  campaignId: string;
}

export const EditCampaignProvider: React.FC<EditCampaignProviderProps> = ({ children, campaignId: initialCampaignId }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [campaignId, setCampaignId] = useState(initialCampaignId);
  
  const [formData, setFormData] = useState<EditCampaignFormData>({
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

  const value: EditCampaignContextType = {
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
    campaignId,
    setCampaignId,
    updateTitle,
    updateCategory,
    updateGoal,
    updateEndDate,
    updateDescription,
    updateImage,
    nextStep,
    prevStep,
  };

  return (
    <EditCampaignContext.Provider value={value}>
      {children}
    </EditCampaignContext.Provider>
  );
};
