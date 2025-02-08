import { InboxOutlined } from "@ant-design/icons";
import { useCreateMedia, useDeleteMedia } from "@api/index";
import { urls } from "@constants/urls";
import type { FormInstance, UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadFileStatus } from "antd/es/upload/interface";
import { useEffect, useState } from "react";

const { Dragger } = Upload;

interface Props {
  form: FormInstance;
  name: string;
  multiple?: boolean;
  defaultFiles?: string[];
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
  status?: UploadFileStatus;
}

const extractKey = (url: string): string => {
  const parts = url.split("/");
  return parts.length >= 2 ? `${parts.at(-2)}/${parts.at(-1)}` : parts.at(-1) || "";
};

const FileUploader = ({ form, multiple = false, name, defaultFiles = [] }: Props) => {
  const { mutate: upload } = useCreateMedia<FormData, IFile>(urls.media.create);
  const { mutate: remove } = useDeleteMedia<IKey>(urls.media.delete);
  const [fileList, setFileList] = useState<IUpload[]>([]);

  useEffect(() => {
    if (defaultFiles.length > 0) {
      const initialFiles = defaultFiles.map<IUpload>((url) => ({
        uid: extractKey(url),
        name: url.split("/").pop() || "file.jpg",
        status: "done",
        url,
        key: extractKey(url),
      }));
      setFileList(initialFiles);
      form.setFieldValue(name, multiple ? defaultFiles : defaultFiles[0]);
    }
  }, [defaultFiles, form, multiple, name]);

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
            const updatedList = fileList.filter((file) => file.key !== data.key);
            setFileList(updatedList);
            form.setFieldValue(name, multiple ? updatedList.map((file) => file.url) : undefined);
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
        const uploadedFile: IUpload = { ...newFile, key: data.key, url: data.url, status: "done" };
        const updatedList = multiple ? [...fileList, uploadedFile] : [uploadedFile];

        setFileList(updatedList);
        form.setFieldValue(name, multiple ? updatedList.map((file) => file.url) : data.url);
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
    listType: "picture",
  };

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
