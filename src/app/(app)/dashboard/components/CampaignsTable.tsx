"use client"
import { Campaign } from '@/app/types/Campaign'
import { PriceFormatter } from '@/app/utils/PriceFormatter'
import { CATEGORY_COLOR_MAPPER, CATEGORY_MAPPER } from '@/lib/const/Categories'
import {
    addToast,
    alert,
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from '@heroui/react'
import React, { Key } from 'react'
import { useDashboard } from '../hooks/useDashboard'
import { STATE_COLOR_MAPPER, STATE_MAPPER, STATE_NAME_TO_ID } from '@/lib/const/States'
import { AlertCircle, Edit, Eye, Plus, Share, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDashboardModal } from '../hooks/useDashboardModal'
const { NEXT_PUBLIC_HOST_URL } = process.env;
export function CampaignsTable() {
    const { campaigns, selectCampaign } = useDashboard();
    const { pendingChangeModal, cancelledModal } = useDashboardModal();
    const router = useRouter();
    const redirectToCampaign = (id:number) => router.push(`/campaigns/${id}`);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
    const pages = Math.ceil(campaigns.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return campaigns.slice(start, end);
    }, [page, campaigns, rowsPerPage]);

    const renderCell = React.useCallback((campaign: Campaign, columnKey: Key) => {
        switch (columnKey) {
            case "title":
                return (
                    <div className="flex items-center">
                        {/* <img
                            className="h-10 w-10 rounded object-cover Campaña mr-3"
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
                        {PriceFormatter(campaign.goal)}
                    </Chip>
                );
            case "category":
                return (
                    <Chip size='sm' variant='flat' color={CATEGORY_COLOR_MAPPER(campaign.category)}>
                        {CATEGORY_MAPPER(campaign.category)}
                    </Chip>
                );

            case "status":
                return (
                    <Chip size='sm' variant='flat' color={STATE_COLOR_MAPPER(campaign.status)}>
                        {STATE_MAPPER(campaign.status)}
                    </Chip>
                );
            case "actions":
                switch (campaign.status) {
                    case STATE_NAME_TO_ID.ACTIVE:
                        return (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>Acciones</Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem startContent={<Eye />} key={`see-${campaign.id}`} onPress={() => redirectToCampaign(campaign.id)}>Ver Campaña</DropdownItem>
                                    <DropdownItem startContent={<Edit />}key={`modify-${campaign.id}`}>Modificar Campaña</DropdownItem>
                                    <DropdownItem startContent={<Share />} key={`share-${campaign.id}`} onPress={() => shareCampaign(campaign)}>Compartir</DropdownItem>
                                    <DropdownItem color='danger' startContent={<X />} key={`cancel-${campaign.id}`}>Cancelar</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        );
                    case STATE_NAME_TO_ID.IN_REVIEW:
                        return (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>Acciones</Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem startContent={<Edit />} key={`modify-${campaign.id}`}>Modificar Campaña</DropdownItem>
                                    <DropdownItem startContent={<X />} color='danger' key={`cancel-${campaign.id}`}>Cancelar</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        );
                    case STATE_NAME_TO_ID.PENDING_CHANGE:
                        return (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>Acciones</Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem startContent={<Eye />} key={`see-pending-changes-${campaign.id}`} onPress={() => openPendingChangeModal(campaign)}>Ver Cambios Pendientes</DropdownItem>
                                    <DropdownItem startContent={<Edit />}key={`modify-${campaign.id}`}>Modificar Campaña</DropdownItem>
                                    <DropdownItem color='danger' startContent={<X />}key={`cancel-${campaign.id}`}>Cancelar</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        );
                    case STATE_NAME_TO_ID.CANCELLED:
                        return (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>Acciones</Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    {/* <DropdownItem startContent={<Eye />} key={`see-${campaign.id}`} onPress={() => redirectToCampaign(campaign.id)}>Ver Campaña</DropdownItem> */}
                                    <DropdownItem startContent={<Eye />} key={`see-reason-${campaign.id}`} onPress={() => openCancelledModal(campaign)}>Ver Motivo de Cancelacion</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        );
                    case STATE_NAME_TO_ID.COMPLETED:
                        return (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>Acciones</Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem startContent={<Eye />} key={`see-${campaign.id}`} onPress={() => redirectToCampaign(campaign.id)}>Ver Campaña</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        );
                }
            default:
                return String(campaign[columnKey as keyof Campaign] || '');

        }
    }, []);

    const openPendingChangeModal = (campaign: Campaign) => {
        pendingChangeModal.onOpen();
        selectCampaign(campaign);
    };


    const openCancelledModal = (campaign: Campaign) => {
        cancelledModal.onOpen();
        selectCampaign(campaign);
    };

    const shareCampaign = async (campaign: Campaign) => {
        const text = `${NEXT_PUBLIC_HOST_URL}/campaigns/${campaign.id}`;
        await navigator.clipboard.writeText(text);
        addToast({
              title: "Enlace Copiado",
              description: "El enlace de la campaña ha sido copiado al portapapeles.",
              color: "secondary",
            })
    }

    return (
        campaigns.length > 0 ? (
            <Table
                aria-label="Tabla de campañas con paginación"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    <TableColumn align='center' key="title">Campaña</TableColumn>
                    <TableColumn align='center' key="category">Categoría</TableColumn>
                    <TableColumn align='center' key="goal">Meta</TableColumn>
                    <TableColumn align='center' key="endDate">Fecha Finalizacion</TableColumn>
                    <TableColumn align='center' key="status">Estado</TableColumn>
                    <TableColumn align='center' key="actions">Acciones</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{renderCell(item, "title")}</TableCell>
                            <TableCell>{renderCell(item, "category")}</TableCell>
                            <TableCell>{renderCell(item, "goal")}</TableCell>
                            <TableCell>{renderCell(item, "endDate")}</TableCell>
                            <TableCell>{renderCell(item, "status")}</TableCell>
                            <TableCell>{renderCell(item, "actions")}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        ) : (
            <div className="text-center py-16">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes campañas activas</h3>
                <p className="text-gray-500 mb-6">
                    ¡Comienza a crear tu primera campaña ahora!
                </p>
                <Link
                    href="/campaigns/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover Campaña:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    <Plus className="h-4 w-4 mr-2" /> Nueva Campaña
                </Link>
            </div>
        )
    )
}
