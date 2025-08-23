import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

export const useDashboardModal = () => {

    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboardModal must be used within a DashboardProvider');
    }
    const { pendingChangeModal, cancelledModal} = context;

    return {
        pendingChangeModal, cancelledModal
    };
}
