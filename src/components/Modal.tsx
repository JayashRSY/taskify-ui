import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import * as Icons from "react-feather";

interface DialogProps {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  action?: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  action,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        {/* Background Overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-[20px] shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-2">
          <div className="relative">
            <Icons.X
              className="absolute top-1 right-1 hover:cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            {title && (
              <div className="mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
              </div>
            )}
            <div className="">{children}</div>
          </div>
          {action && (
            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              >
                {action}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
