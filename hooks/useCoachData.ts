import { useQuery } from '@tanstack/react-query';
import { getComments, getPublicCoachData } from '@/utils/coachMethods';

export function usePublicCoachData(coachId: string | null) {
  const coachQuery = useQuery({
    queryKey: ['coaches', coachId],
    queryFn: () => getPublicCoachData(coachId),
    enabled:
      !!coachId && coachId !== 'fetching' && coachId !== 'no-coach',
    staleTime: Infinity,
  });
  if (coachQuery.data) {
    return coachQuery.data;
  } else {
    return null;
  }
}

export function useCoachCommentData(coachId: string) {
  const commentQuery = useQuery({
    queryKey: ['coaches', coachId, 'comments'],
    queryFn: () => getComments(coachId),
    enabled:
      !!coachId && coachId !== 'fetching' && coachId !== 'no-coach',
    staleTime: Infinity,
  });
  if (commentQuery.data) {
    return commentQuery.data;
  } else {
    return null;
  }
}
