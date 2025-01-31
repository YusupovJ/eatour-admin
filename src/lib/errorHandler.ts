import { notification } from "antd";
import { AxiosError } from "axios";

export const errorHandler = (error: any) => {
  if (error instanceof AxiosError) {
    return notification.error({
      message: error.response?.data.message,
    });
  }

  notification.error({
    message: "Unhandled error",
  });
};
