import { CampaignFormProvider } from '../shared/context/CampaignFormContext';

export default function CreateCampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <CampaignFormProvider mode="create">
      {children}
    </CampaignFormProvider>
  );
}