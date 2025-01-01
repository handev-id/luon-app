import { Fragment, useEffect, useState } from "react";
import { ModalParams } from "./use-modal";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal<T>({
  children,
  title,
  control,
  onClose = () => {},
}: ModalParams<T>) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!control.isOpen && mount) {
      onClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control.isOpen]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <Transition appear show={control.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={control.close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg pb-3 relative mb-6 border-b border-neutral-300 font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
