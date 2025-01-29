import { Modal, message } from "antd";
import { useQueryClient } from "react-query";
import { ExclamationCircleFilled } from "@ant-design/icons";

import type { ModalFuncProps } from "antd";
import { useDeleteApi } from "@api/index";
import { useNavigate } from "react-router-dom";

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
  const navigation = useNavigate();
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

  const showDeleteConfirm = (id: string, deleteName: string, errorMessage: string, key?: "variant") => {
    const res = confirm({
      title: "Buni oʻchirib tashlaysizmi?",
      icon: <ExclamationCircleFilled />,
      content: deleteName,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
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
            onSuccess: (data) => {
              if (data.success) {
                message.success(`${deleteName} o'chirildi`);
                if (getUrlKey !== undefined) {
                  queryClient.invalidateQueries(getUrlKey);
                }

                res.update((config) => ({
                  ...controlLoadingAndDisbled(config, false),
                  open: false,
                }));
                if (key !== undefined) {
                  navigation("/variants");
                }
              } else {
                console.error(data.error, "🔥");
                message.error("Nimadir hato ketti consolga qarang");

                res.update((config) => controlLoadingAndDisbled(config, false));
              }
            },
            onError: (error) => {
              console.error(error, "🔥");
              message.error(`${errorMessage}`);

              res.update((config) => controlLoadingAndDisbled(config, false));
            },
          });
        },
        type: "primary",
      },
    });
  };

  const deleteItem = (id: string, name: string, errorMessage: string, key?: "variant") => {
    showDeleteConfirm(id, name, errorMessage, key);
  };

  return { deleteItem };
};

export default useDelete;
