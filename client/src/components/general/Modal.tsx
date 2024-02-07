import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  children: ReactNode;
  wrapChildren?: boolean;
  wrapperClass?: string;
};

const Modal = ({
  children,
  wrapperClass,
  wrapChildren = false,
}: ModalProps) => {
  const wrapperClasses = twMerge(
    "absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.1)] z-50",
    wrapperClass
  );

  const childrenWrapper = <div className={wrapperClasses}>{children}</div>;
  return createPortal(wrapChildren ? childrenWrapper : children, document.body);
};

export default Modal;
