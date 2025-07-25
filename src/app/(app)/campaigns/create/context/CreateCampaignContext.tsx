"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CreateCampaignFormData {
  title: string;
  category?: number;
  goal: number;
  endDate: string;
  description: string;
  image: string;
  imageFile: File | null;
}

export interface CreateCampaignContextType {
  // Form data
  formData: CreateCampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateCampaignFormData>>;
  
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
}

const CreateCampaignContext = createContext<CreateCampaignContextType | undefined>(undefined);

export const useCreateCampaignContext = () => {
  const context = useContext(CreateCampaignContext);
  if (!context) {
    throw new Error('useCreateCampaignContext must be used within a CreateCampaignProvider');
  }
  return context;
};

interface CreateCampaignProviderProps {
  children: ReactNode;
}

export const CreateCampaignProvider: React.FC<CreateCampaignProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<CreateCampaignFormData>({
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

  const value: CreateCampaignContextType = {
    formData,
    setFormData,
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
  };

  return (
    <CreateCampaignContext.Provider value={value}>
      {children}
    </CreateCampaignContext.Provider>
  );
};
