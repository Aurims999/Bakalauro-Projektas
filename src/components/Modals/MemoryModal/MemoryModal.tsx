import { useEffect, useRef } from "react";

import "./memoryModal.css";

export default function MemoryModal({ openModal, closeModal }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className="memoryModal">
      <h1>Hello World</h1>
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
}
