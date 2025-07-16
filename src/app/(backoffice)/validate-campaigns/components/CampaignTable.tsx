"use client"
import { Campaign } from '@/app/types/Campaign'
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip
} from '@heroui/react'
import { BookOpenText, CheckIcon, PencilLine, PenTool, X } from 'lucide-react'
import React, { Key } from 'react'
import { useValidateCampaignsModals } from '../hooks/useValidateCampaignsModals'

export function CampaignsTable() {
    const { acceptModal, rejectModal, reviewModal } = useValidateCampaignsModals();
    const userCampaigns: Campaign[] = [
        {
            id: '1',
            title: 'Campaña de Ayuda a Niños',
            category: 'Salud',
            imageUrl: '/images/campaign1.jpg',
            goal: 10000,
            daysLeft: 10,
            endDate: new Date('2023-12-31'),
            description: 'Ayudamos a niños en situación vulnerable proporcionándoles atención médica y educación.',
            status: 'active',
            donors: 245,
            amountRaised: 7500,
            creator: 'Juan Pérez',
            creatorImageUrl: '/images/creator1.jpg',
            creatorBio: 'Activista social con más de 10 años de experiencia en proyectos comunitarios.',
            walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
            isVerified: true,
            fullDescription: 'Esta campaña busca recaudar fondos para proporcionar atención médica y educación a niños',
            createdAt: new Date('2023-01-01')
        },
        {
            id: '2',
            title: 'Protección del Medio Ambiente',
            category: 'Medio Ambiente',
            imageUrl: '/images/campaign2.jpg',
            goal: 8000,
            daysLeft: 5,
            endDate: new Date('2023-09-15'),
            description: 'Proyecto para la conservación de bosques nativos y reforestación de áreas degradadas.',
            status: 'active',
            donors: 128,
            amountRaised: 6200,
            creator: 'María González',
            creatorImageUrl: '/images/creator2.jpg',
            creatorBio: 'Bióloga especializada en conservación ambiental.',
            walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
            isVerified: true,
            fullDescription: 'Esta campaña busca proteger los bosques nativos mediante proyectos de reforestación y conservación.',
            createdAt: new Date('2023-06-01')
        }
    ]

    const renderCell = React.useCallback((campaign: Campaign, columnKey: Key) => {
        switch (columnKey) {
            case "title":
                return (
                    <div className="flex items-center">
                        {/* <img
                            className="h-10 w-10 rounded object-cover mr-3"
                            src={campaign.imageUrl}
                            alt={campaign.title}
                        /> */}
                        <div className="text-sm font-medium text-gray-900">
                            {campaign.title}
                        </div>
                    </div>
                );
            case "endDate":
                return (
                    <div>
                        {campaign.endDate.toLocaleDateString('es-ES')}
                    </div>
                );
            case "goal":
                return (
                    <Chip className="text-sm" color='success' variant='flat'>
                        USD {campaign.goal}
                    </Chip>
                );
            case "creator":
                return (
                    <p className="font-bold text-medium">
                        {campaign.creator}
                    </p>
                );

            case "category":
                return (
                    <Chip size='sm' variant='flat' color='secondary'>
                        {campaign.category} 
                    </Chip>
                );
            case "actions":
                return (
                    <div className='flex flex-row gap-2'>
                        <Tooltip content="Ver Descripciones">
                            <Button isIconOnly>
                                <BookOpenText className="h-5 w-5" />
                            </Button>
                        </Tooltip>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button color='secondary' variant='flat'>
                                    <PenTool className="h-5 w-5" /> Acciones
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key={"Aprobar"} color='success' onClick={acceptModal.onOpen}><p className='flex flex-row gap-2'><CheckIcon />Aprobar</p></DropdownItem>
                                <DropdownItem key={"Rechazar"} color='danger' onClick={rejectModal.onOpen}><p className='flex flex-row gap-2'><X />Rechazar</p></DropdownItem>
                                <DropdownItem key={"Editar"} color='secondary' onClick={reviewModal.onOpen}><p className='flex flex-row gap-2'><PencilLine />Solicitar Cambios</p></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                );
            default:
                return campaign[columnKey];
        }
    }, []);
    return (
        <Table>
            <TableHeader>
                <TableColumn key="creator">Creador</TableColumn>
                <TableColumn key="title">Campaña</TableColumn>
                <TableColumn key="category">Categoría</TableColumn>
                <TableColumn key="goal">Meta</TableColumn>
                <TableColumn key="endDate">Fecha Finalizacion</TableColumn>
                <TableColumn key="actions">Acciones</TableColumn>
            </TableHeader>
            <TableBody items={userCampaigns}>
                {(item) => (
                    <TableRow key={item.id}>
                        <TableCell>{renderCell(item, "creator")}</TableCell>
                        <TableCell>{renderCell(item, "title")}</TableCell>
                        <TableCell>{renderCell(item, "category")}</TableCell>
                        <TableCell>{renderCell(item, "goal")}</TableCell>
                        <TableCell>{renderCell(item, "endDate")}</TableCell>
                        <TableCell>{renderCell(item, "actions")}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
