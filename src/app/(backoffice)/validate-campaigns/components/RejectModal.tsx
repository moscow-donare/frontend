"use client";
import { Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import { useValidateCampaignsModals } from "../hooks/useValidateCampaignsModals";
import { useState } from "react";

export default function RejectModal() {
    const { rejectModal } = useValidateCampaignsModals();
    const [comment, setComment] = useState("");
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