"use client"

import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useCampaigns } from "@/app/hooks/useCampaings";
import { Campaign } from "@/app/types/Campaign";
import { Button, Card, CardBody } from "@heroui/react";
import { AlertCircle, ArrowLeft, Link } from "lucide-react";
import { useState } from "react";

export default function CampaignsPage() {
  const { getAllCampaigns } = useCampaigns(); // Hook para acceder al contexto de campañas
  const [isLoaded, setIsLoaded] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const handleGetCampaign = async () => {
    const response = await getAllCampaigns();
    console.log("Campaigns:", response);
    setCampaigns(response);
    setIsLoaded(true);
  };

  // useEffect(() => {
  //   handleGetCampaign();
  // }, []);


 if (!isLoaded) {
    return (
      <LoadingSpinner />
    )
  }

  if (!campaigns) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-lg">
          <CardBody className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-danger mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Campañas no encontradas</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Lo sentimos, las campañas que estás buscando no existen o han sido eliminadas.
            </p>
            <Button
              as={Link}
              href="/home"
              color="primary"
              variant="solid"
              size="lg"
              startContent={<ArrowLeft className="h-5 w-5" />}
            >
              Volver al inicio
            </Button>
          </CardBody>
        </Card>
      </div>
    )
  }


  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>Campaigns Page</h1>
      {/* Add your campaign components here */}
    </div>
  );
}