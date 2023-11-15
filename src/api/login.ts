import { useUserStore } from "~/stores";
import { api } from "./axios";

export interface UserToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}
export interface GoogleLoginRequest {
  email: string;
  name: string;
  googleToken: string;
}

export const googleLogin = async ({
  email,
  name,
  googleToken,
}: GoogleLoginRequest) => {
  const googleLoginPayload = { email, name, googleToken };
  const response = await api.post("/auth/google", {
    ...googleLoginPayload,
  });
  return response.data;
};

export function logout() {
  const { setUser, setToken } = useUserStore.getState();

  setUser(null);
  setToken(null);
}
