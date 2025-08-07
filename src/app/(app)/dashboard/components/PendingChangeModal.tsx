import { Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useDashboard } from "../hooks/useDashboard";
import { useDashboardModal } from "../hooks/useDashboardModal";

export default function PendingChangeModal() {
    const { pendingChangeModal } = useDashboardModal();
    const { selectedCampaign } = useDashboard();
    return (
    <Modal
      isOpen={pendingChangeModal.isOpen}
      onClose={pendingChangeModal.onClose}
      size="2xl"
      placement="top-center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h4>
              Su campaña: <b>{selectedCampaign?.title}</b> está pendiente de revisión por la siguiente razón:
              </h4>
            </ModalHeader>
            <ModalBody>
            <Alert color="warning" title={selectedCampaign?.stateChanges[0]?.reason || ""} />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={pendingChangeModal.onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    );
}