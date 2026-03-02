import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/api';
import Notes from './Notes.client';

export default async function FilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', 1],
    queryFn: () => fetchNotes({ tag: tag !== 'all' ? tag : undefined, page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
}