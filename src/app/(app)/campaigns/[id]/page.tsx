"use client"
import {
  Clock,
  Users,
  Share2,
  Heart,
  Calendar,
  User,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import DonationForm from "../../../components/DonationForm"
import TransactionList from "../../../components/TransactionList"
import { useTransactions } from "../../../hooks/useTransactions"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Progress,
  Avatar,
  Image,
  Alert
} from "@heroui/react"
import { useCampaigns } from "@/app/hooks/useCampaings"
import { Campaign } from "@/app/types/Campaign"
import { useEffect, useState } from "react"
import { useIPFS } from "@/app/hooks/useIPFS"
import LoadingSpinner from "@/app/components/LoadingSpinner"
import { CATEGORY_COLOR_MAPPER, CATEGORY_MAPPER } from "@/lib/const/Categories"
import { DateFormatter } from "@/app/utils/DateFormatter"
import { PriceFormatter } from "@/app/utils/PriceFormatter"
import { STATE_NAME_TO_ID } from "@/lib/const/States"

export default function Page() {
  const params = useParams()
  const id = params?.id as string
  const { getCampaignById } = useCampaigns()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { resolveCid } = useIPFS()
  const { transactions, addTransaction } = useTransactions(id || "")
  useEffect(() => {

    const fetchCampaign = async () => {
      if (id) {
        const campaign = await getCampaignById(Number(id))
        console.log("Campaign fetched:", campaign)
        setCampaign(campaign || null)
        setIsLoaded(true)
      }
    }
    fetchCampaign()
  }, [])


  const handleDonate = (amount: number, message: string, isAnonymous: boolean) => {
    // In a real app, this would process payment and create blockchain transaction
    addTransaction({
      id: Date.now().toString(),
      campaignId: id || "",
      type: "donation",
      amount: amount,
      from: isAnonymous ? "0x000...000" : "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      to: campaign?.walletAddress || "",
      txHash: `0x${Math.random().toString(16).slice(2)}`,
      date: new Date(),
      message: message,
    })
  }

  if (!isLoaded) return <LoadingSpinner />

  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-lg">
          <CardBody className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-danger mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Campaña no encontrada</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Lo sentimos, la campaña que estás buscando no existe o ha sido eliminada.
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

  const progress = (campaign.amountRaised / campaign.goal) * 100


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button
          as={Link}
          href="/home"
          variant="light"
          color="secondary"
          startContent={<ArrowLeft className="h-4 w-4" />}
          className="text-secondary-600 hover:text-secondary-800"
        >
          Volver
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}


        <div className="lg:col-span-2 space-y-6">
          {campaign.status === STATE_NAME_TO_ID.CANCELLED && (
            <Alert title="Campaña Cancelada" color="danger" className="mb-6" description="Esta campaña ha sido cancelada y no está aceptando más donaciones.">
            </Alert>
          )}
          {campaign.status === STATE_NAME_TO_ID.COMPLETED && (
            <Alert title="Campaña Completada" color="success" className="mb-6" description="¡Esta campaña ha sido completada!">
            </Alert>
          )}
          {/* Campaign Image and Basic Info */}
          <Card className="shadow-lg overflow-hidden">
            <div className="relative">
              <Image
                src={resolveCid(campaign.imageCID) || "/placeholder.svg"}
                alt={campaign.title}
                className="w-full h-80 object-cover"
                removeWrapper
              />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Chip
                  color={CATEGORY_COLOR_MAPPER(campaign.category as number)}
                  variant="solid"
                  size="md"
                  className="font-semibold"
                >
                  {CATEGORY_MAPPER(campaign.category)}
                </Chip>
              </div>

              {/* Verified Badge */}
              {campaign.isVerified && (
                <div className="absolute top-4 right-4 z-10">
                  <Chip
                    color="success"
                    variant="solid"
                    startContent={<CheckCircle className="h-4 w-4" />}
                    className="font-semibold"
                  >
                    Verificado
                  </Chip>
                </div>
              )}
            </div>

            <CardBody className="p-8">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{campaign.title}</h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <span>Creado el {DateFormatter(campaign.createdAt)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  {/* <span>Por {campaign.creator}</span>
                   */}
                  {/* TODO: Obtener el nombre del creador de la campaña */}
                  <span>Por Creator</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>{campaign.daysLeft} días restantes</span>
                </div>
              </div>

              {/* Progress Section */}
              <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 mb-8">
                <CardBody className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {PriceFormatter(campaign.amountRaised)}
                      </p>
                      <p className="text-gray-600">de {PriceFormatter(campaign.goal)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-secondary">
                        {progress.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600">completado</p>
                    </div>
                  </div>

                  <Progress
                    value={Math.min(progress, 100)}
                    color="primary"
                    size="lg"
                    className="mb-4"
                  />

                  <div className="flex justify-between items-center">
                    <Chip
                      color="secondary"
                      variant="flat"
                      startContent={<Users className="h-4 w-4" />}
                    >
                      {campaign.donors} donantes
                    </Chip>
                    <Chip
                      color={campaign.daysLeft > 7 ? "success" : "warning"}
                      variant="flat"
                      startContent={<Clock className="h-4 w-4" />}
                    >
                      {campaign.daysLeft} días restantes
                    </Chip>
                  </div>
                </CardBody>
              </Card>

              {/* Description */}
              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Sobre esta campaña</h2>
                <p className="text-gray-700 text-lg mb-4">{campaign.description}</p>
                <p className="text-gray-700 leading-relaxed">{campaign.fullDescription}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  color="primary"
                  variant="solid"
                  size="lg"
                  startContent={<Heart className="h-5 w-5" />}
                  className="flex-1"
                >
                  Me gusta
                </Button>
                <Button
                  color="secondary"
                  variant="bordered"
                  size="lg"
                  startContent={<Share2 className="h-5 w-5" />}
                  className="flex-1"
                >
                  Compartir
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Blockchain Transparency Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary">Transparencia Blockchain</h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-start mb-6">
                <div className="bg-primary-100 p-3 rounded-lg mr-4">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Verificación Completa</h3>
                  <p className="text-gray-600">
                    Todas las transacciones de esta campaña son públicas y verificables en la blockchain.
                    Puedes verificar el contrato inteligente y las transacciones en tiempo real.
                  </p>
                </div>
              </div>

              <Card className="bg-gray-50">
                <CardBody>
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-2">Dirección del contrato</p>
                      <Card className="bg-white border">
                        <CardBody className="py-3">
                          <code className="text-sm font-mono text-gray-800">
                            {campaign.walletAddress}
                          </code>
                        </CardBody>
                      </Card>
                    </div>
                    <div className="flex items-end">
                      <Button
                        as="a"
                        href={`https://etherscan.io/address/${campaign.walletAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                        variant="bordered"
                        endContent={<ExternalLink className="h-4 w-4" />}
                      >
                        Ver en blockchain
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </CardBody>
          </Card>

          {/* Transactions */}
          <Card className="shadow-lg">
            <CardBody>
              <TransactionList transactions={transactions} />
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Donation Form */}
          {campaign.status === STATE_NAME_TO_ID.ACTIVE &&
            <div className="sticky top-24">
              <DonationForm campaign={campaign} onDonate={handleDonate} />
            </div>
          }
          {/* Creator Info */}
          <Card className="shadow-lg w-full">
            <CardHeader>
              <h3 className="text-xl font-semibold text-primary">Acerca del beneficiario</h3>
            </CardHeader>
            <CardBody>
              <div className="flex items-center mb-6">
                <Avatar
                  src={"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"}
                  alt={campaign.creator}
                  size="lg"
                  className="mr-4"
                />
                <div>
                  {/* <h4 className="font-semibold text-gray-900 text-lg">{campaign.creator}</h4> */}
                  {/* TODO: Obtener el nombre del creador de la campaña */}
                  <h4 className="font-semibold text-gray-900 text-lg">Creator</h4>
                  <p className="text-gray-500">Organizador de la campaña</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Este organizador está trabajando para ayudar a su comunidad y necesita tu apoyo para lograrlo.
              </p>

              {campaign.isVerified && (
                <Chip
                  color="success"
                  variant="flat"
                  startContent={<CheckCircle className="h-4 w-4" />}
                  className="font-semibold"
                >
                  Identidad verificada
                </Chip>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}