import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CardId } from "~/cards";

export interface CardStoreState {
  hiddenCards: CardId[];
  hideCard(id: CardId): void;
  showCard(id: CardId): void;
}

export const useCardStore = create<CardStoreState>()(
  persist(
    (set, get) => ({
      hiddenCards: [],
      hideCard: (id) => {
        set({ hiddenCards: [...get().hiddenCards, id] });
      },
      showCard: (id) => {
        set({
          hiddenCards: get().hiddenCards.filter((hiddenId) => id !== hiddenId),
        });
      },
    }),
    {
      name: "weatherCardStore",
    },
  ),
);
