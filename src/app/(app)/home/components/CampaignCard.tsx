import React from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';
import { Campaign } from '../../../types/Campaign';
// import Link from 'next/link';
import Image from 'next/image';
import { Card, CardBody, CardFooter, Button, Chip, Progress } from '@heroui/react';
import { useIPFS } from '@/app/hooks/useIPFS';
import { CATEGORY_MAPPER } from '@/lib/const/Categories';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const progress = (campaign.amountRaised / campaign.goal) * 100;
  const {resolveCid} = useIPFS();

  return (
    <Card>
      <div className="relative">
        <Image
          src={resolveCid(campaign.imageCID)}
          alt={campaign.title}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          {campaign.isVerified && (
            <Chip
              size="sm" 
              color="primary"
              startContent={<CheckCircle className="h-4 w-4" />}
            >
              En Curso
            </Chip>
          )}
        </div>
        <div className="absolute bottom-2 left-2">
          <Chip
            size="sm"
            variant="solid"
            color='danger'
          >
            {CATEGORY_MAPPER(campaign.category)}
          </Chip>
        </div>
      </div>

      <CardBody className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">${campaign.amountRaised.toLocaleString()}</span>
            <span className="text-gray-500">de ${campaign.goal.toLocaleString()}</span>
          </div>
          <Progress
            value={Math.min(progress, 100)}
            color="primary"
            className="max-w-full"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <Chip size="sm" variant="flat" color="secondary" startContent={<Clock className="h-3 w-3" />}>
            {campaign.daysLeft} días
          </Chip>
          <Chip size="sm" variant="flat" color="primary" startContent={<Users className="h-3 w-3" />}>
            {campaign.donors} donantes
          </Chip>
        </div>
      </CardBody>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button
        // TO DO HABILITAR REDICCIONAMIENTO
          // as={Link}
          // href={`/campaigns/${campaign.id}`}
          color="secondary"
          className="w-full font-medium"
        >
          Donar Ahora
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;