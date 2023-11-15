import axios from "axios";

import { useUserStore } from "~/stores/useUserStore";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthHeaders = () => {
  const userToken = useUserStore.getState().token;

  return {
    Authorization: `Bearer ${userToken}`,
  };
};
