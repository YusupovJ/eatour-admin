import { InboxOutlined } from "@ant-design/icons";
import { useCreateMedia, useDeleteMedia } from "@api/index";
import { urls } from "@constants/urls";
import type { FormInstance, UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import { useWatch } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";

const { Dragger } = Upload;

interface Props {
  form: FormInstance;
  name: string;
  multiple?: boolean;
}

interface IFile {
  id: number;
  key: string;
  url: string;
  project: string;
}

interface IKey {
  key: string;
}

interface IUpload extends UploadFile {
  key: string;
}

const FileUploader = ({ form, multiple = false, name }: Props) => {
  const { mutate: upload } = useCreateMedia<FormData, IFile>(urls.media.create);
  const { mutate: remove } = useDeleteMedia<IKey>(urls.media.delete);
  const [fileList, setFileList] = useState<IUpload[]>([]);

  const onRemove = (key?: string) => {
    if (!key) {
      message.error("Fayl o'chirishda xatolik");
      return;
    }
    remove(
      { key },
      {
        onSuccess(data) {
          if (data.key) {
            setFileList(fileList.filter((file) => file.key !== data.key));
          }
        },
      },
    );
  };

  const onUpload = (file: RcFile) => {
    if (fileList[0] && !multiple) {
      onRemove(fileList[0].key);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("project", import.meta.env.VITE_IMAGE_UPLOAD_CLIENT);

    const newFile: IUpload = {
      name: file.name,
      uid: file.uid,
      status: "uploading",
      key: "",
    };
    setFileList([...fileList, newFile]);

    upload(formData, {
      onSuccess(data) {
        if (!multiple) {
          setFileList([{ ...newFile, key: data.key, status: "done" }]);
          form.setFieldValue(name, data.url);
        } else {
          newFile.status = "done";
          newFile.key = data.key;
          setFileList([...fileList, newFile]);
          form.setFieldValue(name, [...(form.getFieldValue(name) || []), data.url]);
        }
      },
    });

    return false;
  };

  const props: UploadProps = {
    maxCount: multiple ? undefined : 1,
    beforeUpload: onUpload,
    onRemove(file) {
      const deleteKey = fileList.find(({ uid }) => uid === file.uid)?.key;
      onRemove(deleteKey);
    },
    fileList,
  };

  const url = useWatch(name, form);

  useEffect(() => {
    if (typeof url === "string") {
      const paths = url.split("/");
      const key = paths[paths.length - 2] + "/" + paths[paths.length - 1];

      setFileList([
        {
          name: "image.jpeg",
          key,
          uid: Date.now().toString(),
          status: "done",
        },
      ]);
      return;
    }

    if (Array.isArray(url)) {
      setFileList(
        url.map((url) => {
          const paths = url.split("/");
          const key = paths[paths.length - 2] + "/" + paths[paths.length - 1];

          return {
            name: "image.jpeg",
            key,
            uid: Date.now().toString(),
            status: "done",
          };
        }),
      );
    }
  }, [url]);

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Yuklash uchun faylni ushbu hududga bosing yoki sudrab torting</p>
    </Dragger>
  );
};

export default FileUploader;
