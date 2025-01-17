import { useQuery } from '@tanstack/react-query';
import { getComments, getCoaches, getImageUrl, getPublicCoachData } from '@/utils/coachMethods';

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

export function useGetCoaches() {
  const getCoachesQuery = useQuery({
    queryKey: ['coaches', 'top-five'],
    queryFn: getCoaches,
    staleTime: Infinity
  });

  if (getCoachesQuery.data){
    return getCoachesQuery.data;
  }
  else{
    return null;
  }
}

export function useGetImageUrl(imagePath: string | null) {
  const imageQuery = useQuery({
    queryKey: ['image', imagePath],
    queryFn: () => getImageUrl(imagePath!),
    enabled: !!imagePath,
    staleTime: Infinity,
  });

  if (imageQuery.data) {
    return imageQuery.data;
  } else {
    return null;
  }
}
