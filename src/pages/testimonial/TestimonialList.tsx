import { useGetList } from "@api/index";
import IconButton from "@components/common/IconButton";
import CustomPagination from "@components/common/Pagination";
import { KeysEnum } from "@constants/keys";
import { urls } from "@constants/urls";
import useDelete from "@hooks/useDelete";
import usePagination from "@hooks/usePagination";
import { Avatar, Flex, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditIcon, TrashIcon, UserIcon } from "lucide-react";
import { useEffect } from "react";
import { ITestimonial } from "src/types";

interface Props {
  onEdit: (data: ITestimonial) => void;
}

const TestimonialList = ({ onEdit }: Props) => {
  const [page] = usePagination();
  const { data, refetch } = useGetList<ITestimonial[]>(KeysEnum.GET_ALL_TESTIMONIALS, urls.testimonial.getAll, {
    params: { page, limit: 15 },
  });
  const { deleteItem } = useDelete(urls.testimonial.remove, KeysEnum.GET_ALL_TESTIMONIALS);

  useEffect(() => {
    refetch();
  }, [page]);

  const columns: ColumnsType<ITestimonial> = [
    {
      title: "№",
      width: "5%",
      render: (_, __, index) => <div className="text-center">{index + Number(data?.pagination?.skip) + 1}</div>,
    },
    {
      title: "Rasm",
      dataIndex: "avatar",
      width: "80px",
      render: (avatar: string) => <Avatar size={64} icon={!avatar && <UserIcon />} src={avatar} />,
    },
    {
      title: "To'liq ism",
      dataIndex: "fullName",
    },
    {
      title: "Sarlavha",
      dataIndex: "title",
    },
    {
      title: "Matn",
      dataIndex: "content",
      ellipsis: true,
    },
    {
      title: "Reyting",
      dataIndex: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      render: (testimonial: ITestimonial) => (
        <Flex className="items-center justify-end gap-3">
          <IconButton onClick={() => onEdit(testimonial)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteItem(testimonial.id, testimonial.fullName)}>
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

export default TestimonialList;
