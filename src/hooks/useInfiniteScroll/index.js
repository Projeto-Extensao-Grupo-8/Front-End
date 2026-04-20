import { api } from '../../services';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteScroll = ({ route, queryName, limit, filters }) => {
  const [newData, setNewData] = useState([]);
  const filter = filters ?? {};

  const fetchItems = async ({ pageParam = 1 }) => {
  return api.get(route, {
    params: { tamanho: limit, pagina: pageParam, ...filter },
  });
};

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
    queryKey: [queryName, ...Object.values(filter)],
    queryFn: fetchItems,
    initialPageParam: 1,
    getNextPageParam(lastPage, pages) {
      if (lastPage.length < limit) return undefined;
      return pages.length + 1;
    }
  });

  useEffect(() => {
    const items = [];
    data?.pages?.forEach((page) => {
        Array.isArray(page?.data) && page.data.forEach((item) => {
            items.push(item);
        });
    });
    setNewData(items);
  }, [data]);

  return {
    data: newData,
    fetchNextPage,
    hasNextPage: hasNextPage === undefined ? true : hasNextPage,
    isFetching,
    isFetchingNextPage
  };
};