import { customAlphabet } from "nanoid";

export const generateOrderNumber = () => {
  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
  return `ORD-${nanoid()}`;
};

export const generateArticleNumber = () => {
  const nanoid = customAlphabet("1234567890", 4);
  return nanoid();
};
