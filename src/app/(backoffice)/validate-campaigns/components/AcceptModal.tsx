import { Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";

export default function AcceptModal() {
    const { acceptModal } = useValidateCampaignsModals();

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
              ¿Seguro que quieres aceptar la campaña?
            </ModalHeader>
            <ModalBody>
              <Alert color="success" title={<>
                La campaña pasara al estado <b>"Activa"</b> y ya se podran registrar donaciones.</>}>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat">
                Cancelar
              </Button>
              <Button color="secondary">
                Aceptar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    );
}