import {useQuery} from "@tanstack/react-query";
import {getPublicSessionData} from "@/utils/sessionMethods";

export function usePublicSessionData(sessionId: string | null) {
  const sessionQuery = useQuery({
    queryKey: ['sessions', sessionId],
    queryFn: () => getPublicSessionData(sessionId),
    enabled:
      !!sessionId && sessionId !== 'fetching' && sessionId !== 'no-coach',
    staleTime: Infinity,
  });
  if (sessionQuery.data) {
    return sessionQuery.data;
  } else {
    return null;
  }
}
