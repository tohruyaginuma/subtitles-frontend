import { HistorySetResponse } from "@/features/history-set/types/history-set";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseError } from "@/client/types/api";
import { listHistorySetService } from "@/features/history-set/services/history-set-services";
import { useInView } from "react-intersection-observer";
import { API_ROUTES } from "@/client/constants/api";

export const useHistorySetPage = () => {
  const { ref, inView } = useInView();

  const [isLoading, setIsLoading] = useState(false);
  const [nextUri, setNextUri] = useState<string | null>(null);
  const [historySetList, setHistorySetList] = useState<HistorySetResponse[]>(
    []
  );

  const fetch = useCallback(async () => {
    if (isLoading || !nextUri) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await listHistorySetService({
        nextUri,
      });

      if ("next" in response) {
        setNextUri(response.next);
      } else {
        setNextUri(null);
      }

      if ("error" in response && response.error) {
        toast.error("Failed to fetch history set list.", {
          description: response.error.message,
        });

        return;
      }

      if ("results" in response) {
        setHistorySetList((prev) => [
          ...prev,
          ...(response.results as HistorySetResponse[]),
        ]);
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
  }, [nextUri, isLoading]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Histories", href: "/histories" },
  ];

  const refetch = useCallback(() => {
    setHistorySetList([]);
    setNextUri(API_ROUTES.historySet);
  }, []);

  useEffect(() => {
    setNextUri(API_ROUTES.historySet);
  }, []);

  useEffect(() => {
    if (inView && nextUri) {
      fetch();
    }
  }, [inView, nextUri, fetch, refetch]);

  return { historySetList, isLoading, fetch, breadcrumbItems, ref, refetch };
};
