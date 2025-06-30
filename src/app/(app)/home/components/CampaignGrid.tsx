import React from 'react';
import { Campaign } from '../../../types/Campaign';
import CampaignCard from './CampaignCard';

interface CampaignGridProps {
  campaigns: Campaign[];
  title: string;
  description?: string;
}

const CampaignGrid: React.FC<CampaignGridProps> = ({ 
  campaigns, 
  title, 
  description 
}) => {  

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && <p className="text-gray-600 max-w-3xl mx-auto">{description}</p>}
        </div>
        {campaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No se encontraron campañas con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CampaignGrid;