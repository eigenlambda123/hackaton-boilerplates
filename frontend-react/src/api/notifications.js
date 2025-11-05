import api from "./axios";

export const sendNotification = async (data) => {
  const res = await api.post("/notifications/send", data);
  return res.data;
};
