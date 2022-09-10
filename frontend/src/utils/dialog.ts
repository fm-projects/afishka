import { ConfirmDialog } from "@/components";
import { Ref, ref } from "vue";

interface UseConfirmDialog {
  showConfirmDialog: () => void;
  hideConfirmDialog: () => void;
  confirmDialog: Ref<typeof ConfirmDialog | null>;
}

export const useConfirmDialog = (): UseConfirmDialog => {
  const confirmDialog = ref<typeof ConfirmDialog | null>(null);

  const showConfirmDialog = () => {
    if (!confirmDialog.value) return;
    console.log("DIALOG", confirmDialog.value);
    confirmDialog.value.toggle();
  };

  const hideConfirmDialog = () => {
    if (!confirmDialog.value) return;
    confirmDialog.value.hide();
  };

  return {
    confirmDialog,
    showConfirmDialog,
    hideConfirmDialog,
  };
};

export default {
  useConfirmDialog,
};
