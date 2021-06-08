import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

//Simple svg close Icon
const XIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// To create a portal for next js in selector div in _document.js. Don't forget to add "<div id="modal" />" before <NextScript /> in _document.js
export function ClientOnlyPortal({ children, selector }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}

// Handle Outside click
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// React hook to import in your component. Use a specific modalId when you need multiple modals in a page.
export function useModal(modalId = "simplemodal") {
  const [mounted, setMounted] = useState(false);

  const ref = useRef();

  useEffect(() => {
    ref.current = document.querySelector(`#${modalId}`);
    setMounted(true);
  }, [mounted]);

  const openModal = () => {
    if (mounted) {
      document.querySelector("body").classList.add("overflow-hidden");
      ref.current.setAttribute("aria-hidden", "false");
      ref.current.classList.add("isopen");
    }
  };

  const closeModal = () => {
    if (ref.current.classList.contains("isopen")) {
      ref.current.setAttribute("aria-hidden", "true");
      ref.current.addEventListener(
        "animationend",
        function callback() {
          ref.current.classList.remove("isopen");
          document.querySelector("body").classList.remove("overflow-hidden");
          ref.current.removeEventListener("animationend", callback, !1);
        },
        !1
      );
    }
  };

  return { openModal, closeModal };
}

//Modal Default UI -- Fill free to add new animations, and personnalize your default modal freely with tailwind
export function Modal({ selector, closeModal, id, children, title }) {
  const ref = useRef();

  useOnClickOutside(ref, () => {
    closeModal();
  });

  return (
    <>
      <style global jsx>
        {`
          /* Default animations */
          @keyframes mmfadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes mmfadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }

          @keyframes mmslideIn {
            from {
              transform: translateY(15%);
            }
            to {
              transform: translateY(0);
            }
          }

          @keyframes mmslideOut {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-10%);
            }
          }

          /*Css classes */
          .modal-slide {
            display: none;
          }

          .modal-slide.isopen {
            display: block;
          }

          .modal-slide[aria-hidden="false"] .modal-overlay {
            animation: mmfadeIn 0.3s cubic-bezier(0, 0, 0.2, 1); /* Replace here for different animation in your modal */
          }

          .modal-slide[aria-hidden="false"] .modal-container {
            animation: mmslideIn 0.3s cubic-bezier(0, 0, 0.2, 1); /* Replace here for different animation in your modal */
          }

          .modal-slide[aria-hidden="true"] .modal-overlay {
            animation: mmfadeOut 0.3s cubic-bezier(0, 0, 0.2, 1); /* Replace here for different animation in your modal */
          }

          .modal-slide[aria-hidden="true"] .modal-container {
            animation: mmslideOut 0.3s cubic-bezier(0, 0, 0.2, 1); /* Replace here for different animation in your modal */
          }

          .modal-slide .modal-container,
          .modal-slide .modal-overlay {
            will-change: transform;
          }
        `}
      </style>
      <ClientOnlyPortal selector={selector}>
        <div className="modal-slide" id={id}>
          <div
            className="modal-overlay fixed flex items-center justify-center top-0 right-0  h-full w-full z-10 "
            style={{ backgroundColor: "rgba(0,0,0, 0.6)" }}
          >
            <div
              className="modal-container relative w-full  max-w-md shadow-xl bg-white rounded-lg m-2 md:m-0 "
              ref={ref}
            >
              <div className="bg-white p-4 md:px-7 md:py-6  rounded-xl">
                <div className=" inline-flex items-center justify-between w-full">
                  <h4 className="text-gray-600 w-full text-lg font-semibold leading-tight">
                    {title}
                  </h4>
                  <a onClick={() => closeModal()}>
                    <XIcon className="h-5 w-5 text-gray-600 font-light hover:text-gray-700 cursor-pointer" />
                  </a>
                </div>
                <p className="text-gray-900 mt-6  w-full text-base font-normal leading-tight">
                  {children}
                </p>
                <div className="mx-4 mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnlyPortal>
    </>
  );
}

Modal.defaultProps = {
  selector: "#modal",
  title: "Simple Modal",
  id: "simplemodal",
  children:"Simple modal text"
};
