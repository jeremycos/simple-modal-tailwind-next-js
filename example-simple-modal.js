import React from "react";
import { useModal, Modal} from "@/components/ui/Modal";

export default function ExamplePage() {
  const { openModal, closeModal } = useModal();
  return (
    <div>
      <a onClick={() => openModal()}>Open Simple Modal</a>
      <Modal closeModal={closeModal} title="Modal title here">Modal text here</Modal>
    </div>
  );
}
