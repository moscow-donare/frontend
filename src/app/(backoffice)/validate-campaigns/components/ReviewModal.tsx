"use client";
import { Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";
import { useState } from "react";

export default function ReviewModal() {
  const { reviewModal } = useValidateCampaignsModals();
  const [comment, setComment] = useState(""); 

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
              ¿Seguro que quieres solicitar cambios en la campaña?
            </ModalHeader>
            <ModalBody>
              <Alert color="warning" title={<>
                La campaña será enviada de nuevo a <b>"En revisión"</b> para que el usuario pueda corregir los errores señalados.
              </>}>
              </Alert>
              <Textarea
                placeholder="Escribe un comentario para el creador de la campaña..."
                rows={4}
                className="mt-4"
                autoFocus
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                isRequired
 />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat">
                Cancelar
              </Button>
              <Button color="secondary" isDisabled={!comment.trim()}>
                Aceptar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}