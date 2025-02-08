import { Pagination } from "antd";
import { FC, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface IPagination {
  total?: number;
  limit?: number;
  page?: number;
}
const CustomPagination: FC<IPagination> = ({ total, limit }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  const handleChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  return (
    <div className="flex justify-center mt-[20px]">
      <Pagination total={total} hideOnSinglePage current={currentPage} onChange={handleChange} pageSize={limit} />
    </div>
  );
};
export default CustomPagination;
