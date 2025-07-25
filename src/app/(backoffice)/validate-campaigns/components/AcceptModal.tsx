import { Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";
import { useValidateCampaigns } from "../hooks/useValidateCampaigns";

export default function AcceptModal() {
    const { acceptModal } = useValidateCampaignsModals();
    const {sendAcceptValidation} = useValidateCampaigns();
    return (
    <Modal
      isOpen={acceptModal.isOpen}
      onClose={acceptModal.onClose}
      size="lg"
      placement="top-center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              ¿Seguro que quieres aprobar la campaña?
            </ModalHeader>
            <ModalBody>
              <Alert color="success" title={<>
                La campaña pasara al estado <b>"Activa"</b> y ya se podran registrar donaciones.</>}>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={acceptModal.onClose}>
                Cancelar
              </Button>
              <Button color="secondary" onPress={()=> sendAcceptValidation()}>
                Aprobar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    );
}