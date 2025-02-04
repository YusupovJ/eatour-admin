import { useState, useId, useEffect } from "react";
import { Modal, Upload, message } from "antd";
import type { FormInstance, UploadFile } from "antd";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { urls } from "@constants/urls";
import useModalView from "@hooks/useModal";
import { useCreateMedia, useDeleteMedia } from "@api/index";
import { useWatch } from "antd/es/form/Form";

interface IImageUpload {
  name: string;
  form: FormInstance;
}

interface IImageUploadResponse {
  id: number;
  key: string;
  url: string;
  project: string;
}

interface IDeleteMediaPost {
  key: string;
}

const FileUploader = ({ form, name }: IImageUpload) => {
  const IMAGE_UPLOAD_CLIENT = import.meta.env.VITE_IMAGE_UPLOAD_CLIENT;
  const ID = useId();

  const { mutate, isLoading: uploadLoading } = useCreateMedia<FormData, IImageUploadResponse>(urls.media.create);

  const { mutate: deleteMutate, isLoading: deleteLoading } = useDeleteMedia<IDeleteMediaPost>(urls.media.delete);

  const [deleteModalOpen, deleteModalOnOpen, deleteModalOnClose] = useModalView();
  const [deleteKey, setDeleteKey] = useState<string | null>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Modal function
  const openDeleteModal = (file: UploadFile) => {
    const loc = new URL(file.url as string);
    const key = loc.pathname.slice(1);
    setDeleteKey(key);
    deleteModalOnOpen();
  };

  const closeDeleteModal = () => {
    setDeleteKey(null);
    deleteModalOnClose();
  };

  const handleChange = async ({ file }: RcCustomRequestOptions) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("project", IMAGE_UPLOAD_CLIENT);

    mutate(formData, {
      onSuccess: (data) => {
        form.setFieldValue(name, data.url);
      },
      onError: (error) => {
        console.error(error, "🔥");

        message.error("Nimadir hato ketti consolga qarang");
      },
    });
  };

  const onRemove = async () => {
    if (deleteKey == null) return;

    deleteMutate(
      { key: deleteKey },
      {
        onSuccess: (data) => {
          if (typeof data.key === "string") {
            setFileList([]);
            form.setFieldValue(name, "");
            message.success(`${deleteKey} rasm o'chirildi`);
            closeDeleteModal();
          } else {
            console.error(data, "🔥");
            message.error("Nimadir hato ketti consolga qarang");
          }
        },
        onError: (error: any) => {
          console.error(error, "🔥");
          message.error("Nimadir hato ketti consolga qarang");
        },
      },
    );
  };

  const url = useWatch([name], form);

  useEffect(() => {
    const url = form.getFieldValue(name);

    if (url) {
      setFileList([
        {
          uid: ID,
          status: "done",
          name: url,
          url: url,
        },
      ]);
    }
  }, [url]);

  const uploadButton = (
    <div className="upload-file">
      <p>{uploadLoading ? "Loading" : "+ Fayl yuklash"}</p>
    </div>
  );

  return (
    <>
      <Upload
        disabled={uploadLoading}
        fileList={fileList}
        listType="picture-card"
        customRequest={handleChange}
        onRemove={(file) => openDeleteModal(file)}
      >
        {fileList?.length === 1 ? null : uploadButton}
      </Upload>

      <Modal
        title="Buni oʻchirib tashlaysizmi?"
        open={deleteModalOpen}
        okText="Ha"
        cancelText="Yo'q"
        okType="danger"
        onCancel={closeDeleteModal}
        okButtonProps={{
          loading: deleteLoading,
          onClick: onRemove,
        }}
        cancelButtonProps={{
          disabled: deleteLoading,
          onClick: closeDeleteModal,
        }}
      >
        <p>{deleteKey}</p>
      </Modal>
    </>
  );
};

export default FileUploader;
