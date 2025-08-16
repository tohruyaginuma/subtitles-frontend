import { useCallback, useEffect, useState } from "react";
import { HistoryResponse } from "@/features/histories/types/histories";
import { HistorySetResponse } from "@/features/history-set/types/history-set";
import { retrieveHistorySetService } from "@/features/history-set/services/history-set-services";
import { listHistoryService } from "@/features/histories/services/histories-services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useHistoriesPage = (historySetId: string) => {
  const router = useRouter();
  const [historySet, setHistorySet] = useState<HistorySetResponse | null>(null);
  const [histories, setHistories] = useState<HistoryResponse[] | null>(null);
  const [isLoadingHistorySet, setIsLoadingHistorySet] = useState(false);
  const [isLoadingHistories, setIsLoadingHistories] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoadingHistorySet(true);
    setIsLoadingHistories(true);

    try {
      const [historySetResponse, historiesResponse] = await Promise.all([
        retrieveHistorySetService(historySetId),
        listHistoryService(historySetId),
      ]);

      if ("error" in historySetResponse && historySetResponse.error) {
        toast.error("Failed to fetch history set.", {
          description: historySetResponse.error.message,
        });
        throw new Error(historySetResponse.error.message);
      }

      if ("id" in historySetResponse) {
        setHistorySet(historySetResponse);
      }

      if ("error" in historiesResponse && historiesResponse.error) {
        toast.error("Failed to fetch histories.", {
          description: historiesResponse.error.message,
        });
      }

      if ("results" in historiesResponse) {
        setHistories(historiesResponse.results as HistoryResponse[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingHistorySet(false);
      setIsLoadingHistories(false);
    }
  }, [historySetId]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Histories", href: "/histories" },
    { label: historySet?.title || "", href: `/histories/${historySetId}` },
  ];

  const redirectToHistorySetPage = () => {
    router.push("/histories");
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    isLoadingHistorySet,
    isLoadingHistories,
    historySet,
    histories,
    breadcrumbItems,
    fetch,
    redirectToHistorySetPage,
  };
};
