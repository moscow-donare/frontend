import { CreateCampaignProvider } from './context/CreateCampaignContext';

export default function CreateCampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <CreateCampaignProvider>
        {children}
    </CreateCampaignProvider>
  );
}