import { useCallback, useEffect, useMemo, useState } from "react";
import { HistoryResponse } from "@/features/histories/types/histories";
import { HistorySetResponse } from "@/features/history-set/types/history-set";
import { retrieveHistorySetService } from "@/features/history-set/services/history-set-services";
import { listHistoryService } from "@/features/histories/services/histories-services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { API_ROUTES } from "@/client/constants/api";

export const useHistoriesPage = (historySetId: string) => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const [historySet, setHistorySet] = useState<HistorySetResponse | null>(null);
  const [histories, setHistories] = useState<HistoryResponse[] | null>(null);
  const [isLoadingHistorySet, setIsLoadingHistorySet] = useState(false);
  const [isLoadingHistories, setIsLoadingHistories] = useState(false);
  const [nextUri, setNextUri] = useState<string | null>(null);

  const fetchHistorySet = useCallback(async () => {
    if (isLoadingHistorySet) {
      return;
    }

    setIsLoadingHistorySet(true);

    try {
      const response = await retrieveHistorySetService(historySetId);

      if ("error" in response && response.error) {
        toast.error("Failed to fetch history set.", {
          description: response.error.message,
        });
        throw new Error(response.error.message);
      }

      if ("id" in response) {
        setHistorySet(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingHistorySet(false);
    }
  }, [isLoadingHistorySet, historySetId]);

  const fetchHistories = useCallback(async () => {
    if (isLoadingHistories || !nextUri) {
      return;
    }

    setIsLoadingHistories(true);

    try {
      const response = await listHistoryService({
        nextUri,
      });

      console.log("response", response);

      if ("error" in response && response.error) {
        toast.error("Failed to fetch histories.", {
          description: response.error.message,
        });
      }

      if ("results" in response) {
        setHistories((prev) => [
          ...(prev || []),
          ...(response.results as HistoryResponse[]),
        ]);
      }

      if ("next" in response) {
        setNextUri(response.next);
      } else {
        setNextUri(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingHistorySet(false);
      setIsLoadingHistories(false);
    }
  }, [nextUri, isLoadingHistories]);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Histories", href: "/histories" },
      { label: historySet?.title || "", href: `/histories/${historySetId}` },
    ],
    [historySet]
  );

  const redirectToHistorySetPage = () => {
    router.push("/histories");
  };

  const refetchHistories = useCallback(() => {
    setHistories([]);
    setNextUri(API_ROUTES.history(historySetId));
  }, []);

  useEffect(() => {
    fetchHistorySet();
    setNextUri(API_ROUTES.history(historySetId));
  }, []);

  useEffect(() => {
    if (inView && nextUri) {
      fetchHistories();
    }
  }, [inView, nextUri, fetchHistories]);

  return {
    isLoadingHistorySet,
    isLoadingHistories,
    historySet,
    histories,
    breadcrumbItems,
    redirectToHistorySetPage,
    ref,
    refetchHistories,
    fetchHistorySet,
  };
};
