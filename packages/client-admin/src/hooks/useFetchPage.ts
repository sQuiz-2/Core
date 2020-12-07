import { Paginate } from '@squiz/shared';
import { useCallback, useState } from 'react';

import { get } from '../tools/WrappedFetch';

export default function useFetchPage<T>(path: string) {
  const [maxPage, setMaxPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const fetchPage = useCallback(
    async (pageIndex: number = 1, limit: number = 10, params?: string): Promise<T | undefined> => {
      setLoading(true);
      let data;
      try {
        data = await get<{ meta: Paginate; data: T }>(
          `${path}?page=${pageIndex}&limit=${limit}&${params}`
        );
        if (!data?.data) return undefined;
        setMaxPage(data.meta.last_page);
      } catch (error) {
        setErrors(error);
      }
      setLoading(false);
      return data?.data;
    },
    []
  );

  return { maxPage, loading, errors, fetchPage };
}
