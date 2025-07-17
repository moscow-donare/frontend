import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";
import { useValidateCampaigns } from "../hooks/useValidateCampaigns";

export default function DescriptionModal() {
    const { descriptionModal } = useValidateCampaignsModals();
    const { selectedCampaign } = useValidateCampaigns();
    return (
    <Modal
      isOpen={descriptionModal.isOpen}
      onClose={descriptionModal.onClose}
      size="2xl"
      placement="top-center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              {selectedCampaign?.title} - Descripción
            </ModalHeader>
            <ModalBody>
              <p>
                {selectedCampaign?.description}
              </p>
              </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={descriptionModal.onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    );
}