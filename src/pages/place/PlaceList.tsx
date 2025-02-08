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
import { IPlace } from "src/types";

interface Props {
  onEdit: (data: IPlace) => void;
}

const PlaceList = ({ onEdit }: Props) => {
  const [page] = usePagination();
  const { data, refetch } = useGetList<IPlace[]>(KeysEnum.GET_ALL_CITIES, urls.place.getAll, {
    params: { page, limit: 15 },
  });
  const { deleteItem } = useDelete(urls.place.remove, KeysEnum.GET_ALL_CITIES);

  useEffect(() => {
    refetch();
  }, [page]);

  const columns: ColumnsType<IPlace> = [
    {
      title: "№",
      width: "5%",
      render: (_, __, index) => <div className="text-center">{index + Number(data?.pagination?.skip) + 1}</div>,
    },
    {
      title: "Rasm",
      dataIndex: "image",
      width: "128px",
      render: (image: string) => <img src={image} alt="place" className="max-w-full w-24 h-24 object-cover" />,
    },
    {
      title: "Shahar nomi",
      dataIndex: "name",
    },
    {
      title: "Mamlakati",
      dataIndex: ["country", "name"],
    },
    {
      render: (place: IPlace) => (
        <Flex className="items-center justify-end gap-3">
          <IconButton onClick={() => onEdit(place)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteItem(place.id, place.name)}>
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

export default PlaceList;
