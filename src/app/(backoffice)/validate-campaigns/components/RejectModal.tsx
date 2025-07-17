import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";

export default function RejectModal() {
    const { rejectModal } = useValidateCampaignsModals();

    return (
    <Modal
      isOpen={rejectModal.isOpen}
      onClose={rejectModal.onClose}
      size="2xl"
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
              <Textarea
                placeholder="Escribe un comentario para el creador de la campaña..."
                rows={4}
                className="mt-4"
              />
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