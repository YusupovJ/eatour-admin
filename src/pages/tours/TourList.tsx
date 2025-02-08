import { useGetList } from "@api/index";
import IconButton from "@components/common/IconButton";
import CustomPagination from "@components/common/Pagination";
import { KeysEnum } from "@constants/keys";
import { urls } from "@constants/urls";
import useDelete from "@hooks/useDelete";
import usePagination from "@hooks/usePagination";
import { Flex, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditIcon, TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { ITour } from "src/types";

const TourList = () => {
  const [page] = usePagination();
  const { data, refetch } = useGetList<ITour[]>(KeysEnum.GET_ALL_TOURS, urls.tour.getAll, {
    params: { page, limit: 15 },
  });
  const { deleteItem } = useDelete(urls.tour.remove, KeysEnum.GET_ALL_TOURS);

  useEffect(() => {
    refetch();
  }, [page]);

  const columns: ColumnsType<ITour> = [
    {
      title: "№",
      width: "5%",
      render: (_, __, index) => <div className="text-center">{index + Number(data?.pagination?.skip) + 1}</div>,
    },
    {
      title: "Sarlavha",
      dataIndex: "title",
    },
    {
      title: "Shahar",
      dataIndex: ["place", "name"],
    },
    {
      title: "Narx",
      dataIndex: "price",
    },
    {
      title: "Ko'rganlar soni",
      dataIndex: "views",
    },
    {
      title: "Bronlar soni",
      dataIndex: "bookings",
    },
    {
      render: (tour: ITour) => (
        <Flex className="items-center justify-end gap-3">
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteItem(tour.id, tour.title)}>
            <TrashIcon />
          </IconButton>
        </Flex>
      ),
    },
  ];

  return (
    <div className="mb-10">
      <Table dataSource={data?.data} rowKey="id" columns={columns} pagination={false} />
      <CustomPagination limit={data?.pagination?.limit} page={data?.pagination?.page} total={data?.pagination?.total} />
    </div>
  );
};

export default TourList;
