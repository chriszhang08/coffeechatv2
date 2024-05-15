import { useQuery } from '@tanstack/react-query';
import { getComments, getPublicCoachData } from '@/utils/coachMethods';

export function usePublicCoachData(coachId: string) {
  return useQuery({
    queryKey: ['coaches', coachId],
    queryFn: () => getPublicCoachData(coachId),
    enabled:
      !!coachId && coachId !== 'fetching' && coachId !== 'no-coach',
    staleTime: Infinity,
  });
}

export function useCoachCommentData(coachId: string) {
  return useQuery({
    queryKey: ['coaches', coachId, 'comments'],
    queryFn: () => getComments(coachId),
    enabled:
      !!coachId && coachId !== 'fetching' && coachId !== 'no-coach',
    staleTime: Infinity,
  });
}
