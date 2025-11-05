import api from './axios';

export const sendTestEmail = async ({ to }) => {
  const res = await api.post(`/email/send-test?recipient=${encodeURIComponent(to)}`);
  return res.data;
};