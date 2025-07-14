// Tipos específicos para el formulario de creación de campañas
export interface CampaignFormData {
  title: string
  description: string
  fullDescription: string
  category: string
  goal: number
  endDate: string
  images: File[]
}

export interface CampaignImage {
  file: File
  preview: string
  id: string
}

export type CampaignStatus = "pending_review" | "active" | "completed" | "cancelled"

export interface CreateCampaignRequest {
  title: string
  description: string
  fullDescription: string
  category: string
  goal: number
  endDate: string
  images: File[]
}

export interface CreateCampaignResponse {
  success: boolean
  campaignId: string
  message: string
  status: CampaignStatus
}

export interface ApiError {
  message: string
  field?: string
  code?: string
}
