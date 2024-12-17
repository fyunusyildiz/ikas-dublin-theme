import React, { useEffect, useRef } from "react";

import Close from "src/components/svg/close";
import useOnClickOutside from "src/utils/hooks/useOnClickOutside";

type Props = {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ visible, title, children, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, () => {
    visible && onClose && onClose();
  });

  useEffect(() => {
    document.documentElement.style.overflow = visible ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 p-5 bg-black bg-opacity-40 z-[9999] ${
        visible ? "flex" : "hidden"
      }`}
      aria-hidden={!visible}
      role="dialog"
      aria-label="modal"
      aria-modal="true"
    >
      <div
        aria-label="modal-inner"
        className="relative h-fit m-auto p-12 mx-auto w-full max-w-[500px] bg-white rounded-12"
        ref={modalRef}
      >
        <button
          className="absolute top-3 right-3 p-4"
          aria-label="modal-close"
          onClick={() => onClose && onClose()}
        >
          <Close />
        </button>
        <div aria-label="modal-content">
          <div className="mb-2 font-bold" aria-label="modal-title">
            {title}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
