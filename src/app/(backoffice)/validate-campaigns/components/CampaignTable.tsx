"use client"
import { Campaign } from '@/app/types/Campaign'
import {
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
    TableRow,
    Tooltip
} from '@heroui/react'
import { BookOpenText, CheckIcon, PencilLine, PenTool, X } from 'lucide-react'
import React, { Key } from 'react'
import { useValidateCampaignsModals } from '../hooks/useValidateCampaignsModals'
import { useValidateCampaigns } from '../hooks/useValidateCampaigns'
import { PriceFormatter } from '@/app/utils/PriceFormatter'
import { CATEGORY_COLOR_MAPPER, CATEGORY_MAPPER } from '@/lib/const/Categories'

export function CampaignsTable() {
    const { openDescriptionModal, openCancelModal, openReviewModal, openAcceptModal } = useValidateCampaignsModals();
    const { campaigns } = useValidateCampaigns();
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
                        {PriceFormatter(campaign.goal)}
                    </Chip>
                );
            case "creator":
                return (
                    //  TODO: Agregar link al perfil del creador
                    //  <Link href={`/profile/${campaign.creator}`}>
                    //      Agregar llamado al back para obtener el nombre del creador
                    // <p className="font-bold text-medium">
                    //     {campaign.creator}
                    // </p>
                    <p>
                        Nombre del creador
                    </p>
                );

            case "category":
                return (
                    <Chip size='sm' variant='flat' color={CATEGORY_COLOR_MAPPER(campaign.category)}>
                        {CATEGORY_MAPPER(campaign.category)} 
                    </Chip>
                );
            case "actions":
                return (
                    <div className='flex flex-row gap-2'>
                        <Tooltip content="Ver Descripciones">
                            <Button isIconOnly onPress={() => openDescriptionModal(campaign)}>
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
                                <DropdownItem key={"Aprobar"} color='success' onClick={() => openAcceptModal(campaign)}><p className='flex flex-row gap-2'><CheckIcon />Aprobar</p></DropdownItem>
                                <DropdownItem key={"Cancelar"} color='danger' onClick={() => openCancelModal(campaign)}><p className='flex flex-row gap-2'><X />Cancelar</p></DropdownItem>
                                <DropdownItem key={"Solicitar Cambios"} color='secondary' onClick={() => openReviewModal(campaign)}><p className='flex flex-row gap-2'><PencilLine />Solicitar Cambios</p></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                );
            default:
                return String(campaign[columnKey as keyof Campaign] || '');
        }
    }, []);
    return (
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
                <TableColumn key="creator">Creador</TableColumn>
                <TableColumn key="title">Campaña</TableColumn>
                <TableColumn key="category">Categoría</TableColumn>
                <TableColumn key="goal">Meta</TableColumn>
                <TableColumn key="endDate">Fecha Finalizacion</TableColumn>
                <TableColumn key="actions">Acciones</TableColumn>
            </TableHeader>
            <TableBody items={items}>
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
