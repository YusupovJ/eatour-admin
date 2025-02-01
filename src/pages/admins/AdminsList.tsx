import { useGetList } from "@api/index";
import IconButton from "@components/common/IconButton";
import CustomPagination from "@components/common/Pagination";
import { KeysEnum } from "@constants/keys";
import { urls } from "@constants/urls";
import useDelete from "@hooks/useDelete";
import usePagination from "@hooks/usePagination";
import { Flex, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { IAdmin } from "src/types";

const AdminsList = () => {
  const [page] = usePagination();
  const { data, refetch } = useGetList<IAdmin>(KeysEnum.GET_ALL_ADMINS, urls.admin.getAll, {
    params: { page, limit: 15 },
  });
  const { deleteItem } = useDelete(urls.admin.delete, KeysEnum.GET_ALL_ADMINS);

  useEffect(() => {
    refetch();
  }, [page]);

  const columns: ColumnsType<IAdmin> = [
    {
      title: "№",
      width: "5%",
      render: (_, __, index) => <div className="text-center">{index + data.pagination.skip + 1}</div>,
    },
    {
      title: "Login",
      dataIndex: "login",
    },
    {
      title: "Creation date",
      dataIndex: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString("en-EN"),
    },
    {
      render: ({ id, login }: IAdmin) => (
        <Flex className="items-center justify-end gap-3">
          <IconButton onClick={() => deleteItem(id, login, "asd")}>
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

export default AdminsList;
