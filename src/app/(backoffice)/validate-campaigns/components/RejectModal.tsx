import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";

export default function RejectModal() {
    const { rejectModal } = useValidateCampaignsModals();

    return (
    <Modal
      isOpen={rejectModal.isOpen}
      onClose={rejectModal.onClose}
      size="lg"
      placement="top-center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              ¿Seguro que quieres cancelar la campaña?
            </ModalHeader>
            <ModalBody>
              <p>
                La campaña pasara al estado <b>"Rechazada/Cancelada"</b> y ya no se podran registrar donaciones.
              </p>
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