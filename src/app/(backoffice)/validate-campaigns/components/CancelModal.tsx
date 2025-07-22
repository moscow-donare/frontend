"use client";
import { Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";
import { useState } from "react";
import { useValidateCampaigns } from "../hooks/useValidateCampaigns";

export default function CancelModal() {
    const { cancelModal } = useValidateCampaignsModals();
    const [comment, setComment] = useState("");
    const { sendCancelValidation } = useValidateCampaigns();
    return (
    <Modal
      isOpen={cancelModal.isOpen}
      onClose={cancelModal.onClose}
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
              <Alert color="danger" title={<>
                La campaña pasara al estado <b>"Cancelada"</b> y ya no se podran registrar donaciones.</>}>
              </Alert>
              <Textarea
                isRequired
                placeholder="Escribe un comentario para el creador de la campaña..."
                rows={4}
                className="mt-4"
                autoFocus
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat">
                Cancelar
              </Button>
              <Button color="secondary" isDisabled={!comment.trim()} onPress={() => sendCancelValidation(comment)}>               
                Aceptar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    );
}