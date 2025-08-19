import { STATE_NAME_TO_ID } from "@/shared/const/States";
import { BarChart, TrendingUp, Users } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";

export default function MetricsComponent() {
    const { campaigns } = useDashboard();

    const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.amountRaised, 0);
    const totalDonors = campaigns.reduce((sum, campaign) => sum + campaign.donors, 0);
    const activeCampaigns = campaigns.filter(campaign => campaign.status == STATE_NAME_TO_ID.ACTIVE).length;

    return(
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-teal-100 rounded-full p-3 mr-4">
              <BarChart className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Recaudado</p>
              <h3 className="text-2xl font-bold text-gray-900">${totalRaised.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Donantes</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalDonors}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Campañas Activas</p>
              <h3 className="text-2xl font-bold text-gray-900">{activeCampaigns}</h3>
            </div>
          </div>
        </div>
      </div>
    )
}