import React from "react";
import { useModal, Modal } from "@/components/ui/Modal";

export default function ExamplePage() {

  const { openModal: openModal1, closeModal: closeModal1 } = useModal("modal1");
  const { openModal: openModal2, closeModal: closeModal2 } = useModal("modal2");
  
  return (
    <>
      <div>
        <a onClick={() => openModal1()}>Open Modal 1</a>
        <Modal id="modal1" closeModal={closeModal1} title="Modal 1">
          First Modal
        </Modal>
      </div>
      <div>
        <a onClick={() => openModal2()}>Open Modal 2</a>
        <Modal id="modal2" closeModal={closeModal2} title="Modal 2">
          Second Modal
        </Modal>
      </div>
    </>
  );
}
