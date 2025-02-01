import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (): [number, (page: number) => void] => {
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setPage(Number(searchParams.get("page") || 1));
  }, [searchParams]);

  return [page, setPage];
};

export default usePagination;
