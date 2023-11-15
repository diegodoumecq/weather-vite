import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  name: string;
}

export interface UserStoreState {
  user: User | null;
  setUser(user: User | null): void;
  token: string | null;
  setToken(token: string | null): void;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set(() => ({ user })),
      setToken: (token) => set(() => ({ token })),
    }),
    {
      name: "weatherUserStore",
    },
  ),
);
