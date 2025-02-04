import { message, Modal } from "antd";
import { useQueryClient } from "react-query";
import { ExclamationCircleFilled } from "@ant-design/icons";

import type { ModalFuncProps } from "antd";
import { useDeleteApi } from "@api/index";

const { confirm } = Modal;

export interface Error {
  statusCode: number;
  message: string;
  error: string;
}

interface IDelete {
  success: boolean;
  data: any | null;
  timestamp: string;
  error: Error | null;
}

const useDelete = (deleteUrl: string, getUrlKey?: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteApi<IDelete>(deleteUrl);

  const controlLoadingAndDisbled = (config: ModalFuncProps, loading: boolean) => ({
    ...config,
    cancelButtonProps: {
      ...config.cancelButtonProps,
      disabled: loading,
    },
    okButtonProps: {
      ...config.okButtonProps,
      loading: loading,
    },
  });

  const showDeleteConfirm = (id: string | number, deleteName: string) => {
    const res = confirm({
      title: "Buni o'chirib tashlamoqchimisiz?",
      icon: <ExclamationCircleFilled />,
      content: deleteName,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yoq",
      cancelButtonProps: {
        onClick: () => {
          res.update((config) => ({
            ...controlLoadingAndDisbled(config, false),
            open: false,
          }));
        },
      },

      okButtonProps: {
        onClick: () => {
          res.update((config) => ({
            ...controlLoadingAndDisbled(config, true),
          }));

          mutate(id, {
            onSuccess: () => {
              message.success(`${deleteName} o'chirildi`);
              if (getUrlKey !== undefined) {
                queryClient.invalidateQueries(getUrlKey);
              }

              res.update((config) => ({
                ...controlLoadingAndDisbled(config, false),
                open: false,
              }));
            },
            onError: () => {
              message.error("O'chirish vaqtida xatolik yuz berdi");
              res.update((config) => controlLoadingAndDisbled(config, false));
            },
          });
        },
        type: "primary",
      },
    });
  };

  const deleteItem = (id: string | number, name: string) => {
    showDeleteConfirm(id, name);
  };

  return { deleteItem };
};

export default useDelete;
