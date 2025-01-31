import { AES } from "crypto-js";

export const handleEncrypted = () =>
  AES.encrypt(
    JSON.stringify({
      client: import.meta.env.VITE_IMAGE_UPLOAD_CLIENT,
      secret: import.meta.env.VITE_IMAGE_UPLOAD_SECRET,
      time: Date.now(),
    }),
    import.meta.env.VITE_IMAGE_UPLOAD_KEY,
  ).toString();
