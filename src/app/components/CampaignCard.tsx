import React from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';
import { Campaign } from '../types/Campaign';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const progress = (campaign.amountRaised / campaign.goal) * 100;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={campaign.imageUrl} 
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          {campaign.isVerified && (
            <div className="bg-white rounded-full p-1 shadow">
              <CheckCircle className="h-5 w-5 text-teal-600" />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              campaign.category === 'Salud' ? 'bg-red-100 text-red-800' :
              campaign.category === 'Educación' ? 'bg-blue-100 text-blue-800' :
              campaign.category === 'Rifa' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'
            }`}>
              {campaign.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">${campaign.amountRaised.toLocaleString()}</span>
            <span className="text-gray-500">de ${campaign.goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-600 h-2 rounded-full" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{campaign.daysLeft} días</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{campaign.donors} donantes</span>
          </div>
        </div>
        
        <Link 
          href={`/campaigns/${campaign.id}`}
          className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Donar Ahora
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;