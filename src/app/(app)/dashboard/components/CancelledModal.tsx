import { Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useDashboard } from "../hooks/useDashboard";
import { useDashboardModal } from "../hooks/useDashboardModal";

export default function CancelledModal() {
  const { cancelledModal } = useDashboardModal();
  const { selectedCampaign } = useDashboard();
  return (
    <Modal
      isOpen={cancelledModal.isOpen}
      onClose={cancelledModal.onClose}
      size="2xl"
      placement="top-center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h4>Su campaña: <b>{selectedCampaign?.title}</b> fue cancelada por la siguiente razón:</h4>
            </ModalHeader>
            <ModalBody>
            <Alert color="danger" title={selectedCampaign!.stateChanges![0].reason || ""} />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={cancelledModal.onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}