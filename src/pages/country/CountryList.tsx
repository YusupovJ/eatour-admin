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
import { ICountry } from "src/types";
import parse from "html-react-parser";

interface Props {
  onEdit: (data: ICountry) => void;
}

const CountryList = ({ onEdit }: Props) => {
  const [page] = usePagination();
  const { data, refetch } = useGetList<ICountry>(KeysEnum.GET_ALL_COUNTRIES, urls.country.getAll, {
    params: { page, limit: 15 },
  });
  const { deleteItem } = useDelete(urls.country.remove, KeysEnum.GET_ALL_COUNTRIES);

  useEffect(() => {
    refetch();
  }, [page]);

  const columns: ColumnsType<ICountry> = [
    {
      title: "№",
      width: "5%",
      render: (_, __, index) => <div className="text-center">{index + data.pagination.skip + 1}</div>,
    },
    {
      title: "Rasm",
      dataIndex: "image",
      width: "128px",
      render: (image: string) => <img src={image} alt="country" className="max-w-full w-24 h-24 object-cover" />,
    },
    {
      title: "Mamlakat nomi",
      dataIndex: "name",
    },
    {
      title: "Tavsif",
      dataIndex: "description",
      render: (desc: string) => parse(desc),
    },
    {
      render: (country: ICountry) => (
        <Flex className="items-center justify-end gap-3">
          <IconButton onClick={() => onEdit(country)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteItem(country.id, country.name)}>
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

export default CountryList;
