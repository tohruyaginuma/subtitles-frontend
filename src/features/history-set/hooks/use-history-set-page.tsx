import { HistorySetResponse } from "@/features/history-set/types/history-set";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseError } from "@/client/types/api";
import { listHistorySetService } from "@/features/history-set/services/history-set-services";

export const useHistorySetPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [historySetList, setHistorySetList] = useState<HistorySetResponse[]>(
    []
  );

  const fetch = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await listHistorySetService();

      if ("error" in response && response.error) {
        toast.error("Failed to fetch history set list.", {
          description: response.error.message,
        });

        return;
      }

      if ("results" in response) {
        setHistorySetList(response.results as HistorySetResponse[]);
      }
    } catch (error) {
      const responseError = error as ResponseError;
      toast.error("Failed to fetch history set list.", {
        description: String(responseError?.message),
      });

      setHistorySetList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Histories", href: "/histories" },
  ];

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { historySetList, isLoading, fetch, breadcrumbItems };
};
