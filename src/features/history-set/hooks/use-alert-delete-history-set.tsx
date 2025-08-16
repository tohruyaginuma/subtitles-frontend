import { toast } from "sonner";
import { useAlertDeleteHistorySetStore } from "@/features/history-set/stores/use-alert-delete-history-set-store";
import { deleteHistorySetService } from "../services/history-set-services";

export const useAlertDeleteHistorySet = (callback: () => void) => {
  const { isOpen, onClose, historySetTitle, historySetId } =
    useAlertDeleteHistorySetStore();

  const onClickDeleteHistorySet = async () => {
    try {
      const response = await deleteHistorySetService(historySetId);

      if (response && "error" in response && response.error) {
        console.error("error", response.error);
        toast.error("Failed to delete history set");
        return;
      }

      toast.success("History set deleted successfully");
      callback();
    } catch (error) {
      console.error("Error deleting history set:", error);
      toast.error("Error deleting history set");
    }
  };

  return {
    isOpen,
    historySetTitle,
    onClickDeleteHistorySet,
    onClose,
  };
};
