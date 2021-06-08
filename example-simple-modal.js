import React from "react";
import { useModal, Modal as ModalSimple } from "@/components/ui/Modal";

export default function ExamplePage() {
  const { openModal, closeModal } = useModal();
  return (
    <div>
      <a onClick={() => openModal()}>Open Simple Modal</a>
      <ModalSimple closeModal={closeModal} />
    </div>
  );
}
