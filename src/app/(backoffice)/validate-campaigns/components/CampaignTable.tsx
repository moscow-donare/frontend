"use client"
import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from '@heroui/react'
import { Edit, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function CampaignsTable() {
    const userCampaigns = [
        {
            id: '1',
            title: 'Campaña de Ayuda a Niños',
            category: 'Salud',
            imageUrl: '/images/campaign1.jpg',
            goal: 10000,
            daysLeft: 10,
            endDate: new Date('2023-12-31'),
        },
        {
            id: '2',
            title: 'Protección del Medio Ambiente',
            category: 'Medio Ambiente',
            imageUrl: '/images/campaign2.jpg',
            goal: 8000,
            endDate: new Date('2023-12-31'),
            daysLeft: 5
        }
    ]

    const renderCell = React.useCallback((campaign, columnKey) => {
        switch (columnKey) {
            case "title":
                return (
                    <div className="flex items-center">
                        <img
                            className="h-10 w-10 rounded object-cover mr-3"
                            src={campaign.imageUrl}
                            alt={campaign.title}
                        />
                        <div>
                            <div className="text-sm font-medium text-gray-900">
                                {campaign.title}
                            </div>
                            <div className="text-xs text-gray-500">
                                {campaign.category}
                            </div>
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
            case "actions":
                return (
                    <div className="flex justify-end space-x-2">
                        <Link href={`/campaign/${campaign.id}`} title="Ver">
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        </Link>
                        <button title="Editar">
                            <Edit className="h-5 w-5 text-blue-400 hover:text-blue-500" />
                        </button>
                        <button title="Eliminar">
                            <Trash2 className="h-5 w-5 text-red-400 hover:text-red-500" />
                        </button>
                    </div>
                );
            default:
                return campaign[columnKey];
        }
    }, []);
    return (
        // <div>
        //     {userCampaigns.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableColumn key="title">Campaña</TableColumn>
                        <TableColumn key="donors">Meta</TableColumn>
                        <TableColumn key="donors">Fecha Finalizacion</TableColumn>
                        <TableColumn key="actions">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody items={userCampaigns}>
                        {(item) => (
                            <TableRow key={item.id}>
                                <TableCell>{renderCell(item, "title")}</TableCell>
                                <TableCell>{renderCell(item, "goal")}</TableCell>
                                <TableCell>{renderCell(item, "endDate")}</TableCell>
                                <TableCell>{renderCell(item, "actions")}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
        //     ) : (
        //         <div className="text-center py-16">
        //             <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        //             <h3 className="text-lg font-medium text-gray-900 mb-2">
        //                 No tienes campañas activas
        //             </h3>
        //             <p className="text-gray-500 mb-6">
        //                 ¡Comienza a crear tu primera campaña ahora!
        //             </p>
        //             <Link
        //                 href="/campaigns/create"
        //                 className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        //             >
        //                 <Plus className="h-4 w-4 mr-2" /> Nueva Campaña
        //             </Link>
        //         </div>
        //     )}
        // </div>
    )
}
