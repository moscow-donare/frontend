"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import AcceptModal from "./components/AcceptModal";
import { CampaignsTable } from "./components/CampaignTable";
import DescriptionModal from "./components/DescriptionModal";
import RejectModal from "./components/CancelModal";
import ReviewModal from "./components/ReviewModal";
import { useValidateCampaigns } from "./hooks/useValidateCampaigns";

export default function ValidateCampaignsPage() {
    const { isLoaded } = useValidateCampaigns();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Validar Campañas</h1>
                    <p className="text-gray-600">Valida las campañas en En Revisión</p>
                </div>
            </div>
                <CampaignsTable/>
                <AcceptModal />
                <RejectModal />
                <ReviewModal />
                <DescriptionModal />
                {!isLoaded && <LoadingSpinner />}
        </div>
    )
}