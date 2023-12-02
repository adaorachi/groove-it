import * as Dialog from "@radix-ui/react-dialog";

import { Icon } from "@/components";

const AppDialog = ({ open, onOpenChange, Content, displayCloseBtn = true }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed top-0 left-0 bottom-0 right-0 place-items-center overflow-auto z-[2200]">
        <Dialog.Content className="data-[state=open]:animate-contentShow h-[100vh] xs:h-auto flex_justify_center w-full max-w-[450px] focus:outline-none m-auto">
          <div className="relative rounded bg-main shadow-dialog p-6 h-full w-full mt-[60px] mb-[60px]">
            <Content />
            {displayCloseBtn && (
              <Dialog.Close asChild>
                <button
                  className="absolute top-[10px] right-[10px] items-center justify-center rounded-full outline-0 h-6 w-6 bg-primary flex_justify_center shadow-dialog"
                  aria-label="Close"
                >
                  <Icon name="IoMdClose" size={15} />
                </button>
              </Dialog.Close>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default AppDialog;
