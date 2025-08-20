import { useCallback } from "react";
import { createHistorySetService } from "@/features/history-set/services/history-set-services";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/client/constants/global";
import { toast } from "sonner";
import { createHistoryService } from "@/features/histories/services/histories-services";
import { useHistoryHandleStore } from "../stores/use-history-handle";

export const useHandleTranscriptData = () => {
  const { historySetId, setHistorySetId, resetHistorySetId } =
    useHistoryHandleStore();

  const createHistorySet = useCallback(async (_title?: string) => {
    try {
      const title = _title || `Subtitle of ${dayjs().format(DATE_FORMAT)}`;
      const response = await createHistorySetService({ title });

      if ("error" in response && response.error) {
        console.error("error", response.error);
        toast.error("Failed to create history set");
      }

      if ("id" in response) {
        setHistorySetId(response.id);
        return response.id;
      }
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  const createHistory = useCallback(
    async (content: string) => {
      if (!historySetId) {
        toast.error("History set is not ready yet.");
        return;
      }

      const contentTrimmed = content.trim();

      if (!contentTrimmed) return;

      try {
        const response = await createHistoryService({
          id: historySetId,
          content: contentTrimmed,
        });

        if (response && "error" in response && response.error) {
          console.error("error", response.error);
          toast.error("Failed to update history set");
        }
      } catch (error) {
        console.error("error", error);
      }
    },
    [historySetId]
  );

  const initializeHistorySetId = useCallback(async () => {
    resetHistorySetId();
  }, []);

  return {
    createHistorySet,
    createHistory,
    initializeHistorySetId,
  };
};
