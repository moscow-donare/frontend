import { ReactNode } from "react";
import { ValidateCampaignProvider } from "./hooks/ValidateCampaignsContext";

export default function ValidateCampaignsLayout({ children }: { children: ReactNode }) {
    return (
        <ValidateCampaignProvider>
            {children}
        </ValidateCampaignProvider>
    );
}