import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";

export default function ReviewModal() {
  const { reviewModal } = useValidateCampaignsModals();

  return (
    <Modal
      isOpen={reviewModal.isOpen}
      onClose={reviewModal.onClose}
      size="2xl"
      placement="top-center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              ¿Seguro que quieres revisar la campaña?
            </ModalHeader>
            <ModalBody>
              <p>
                La campaña será enviada de nuevo a <b>"En revisión"</b> para que el usuario pueda corregir los errores señalados.
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