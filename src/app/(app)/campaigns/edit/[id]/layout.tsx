import { CampaignFormProvider } from '../../shared/context/CampaignFormContext';

interface EditCampaignLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

export default function EditCampaignLayout({ children, params }: EditCampaignLayoutProps) {
    return (
        <CampaignFormProvider mode="edit" campaignId={params.id}>
            {children}
        </CampaignFormProvider>
    );
}
