import { useState } from "react";
import { CheckSquareIcon, EditIcon } from "lucide-react";

import { cardEntries } from "~/cards";
import { SearchCity } from "~/components";
import { useBetterAutoAnimate, useHomeParams } from "~/hooks";
import { cn } from "~/shared";
import { useCardStore } from "~/stores";
import { Button } from "~/ui";

const MODES = ["view", "edit"] as const;
type Mode = (typeof MODES)[number];

export function Home() {
  const { hiddenCards, showCard, hideCard } = useCardStore();
  const [mode, setMode] = useState<Mode>(MODES[0]);

  const [listRef] = useBetterAutoAnimate<HTMLElement>();

  const { lat, lon, city, country, setParams } = useHomeParams();

  return (
    <>
      <nav className="flex w-full items-start gap-4 py-4">
        <div className="flex w-full flex-wrap items-center gap-4">
          <SearchCity
            city={city}
            country={country}
            onSelect={({ type: _, ...values }) => {
              setParams(values);
            }}
          />
          {mode === "edit" &&
            cardEntries.map(([id, { Icon }]) => {
              const hidden = hiddenCards.includes(id);
              return (
                <Button
                  className={cn(hidden && "justify-self-end opacity-50")}
                  size="sm"
                  variant="outline-white"
                  onClick={() => {
                    if (hidden) {
                      showCard(id);
                    } else {
                      hideCard(id);
                    }
                  }}
                >
                  <Icon className="h-5 w-5 text-[currentColor]" />
                </Button>
              );
            })}
        </div>
        <Button
          size="sm"
          onClick={() => setMode(mode === "edit" ? "view" : "edit")}
        >
          {mode === "edit" ? (
            <CheckSquareIcon className="h-5 w-5" />
          ) : (
            <EditIcon className="h-5 w-5" />
          )}
        </Button>
      </nav>
      <main className="flex-grow">
        <div className="flex flex-col gap-4">
          <section
            ref={listRef}
            className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {cardEntries.map(([id, { Component }]) => {
              return hiddenCards.includes(id) ? null : (
                <Component key={id} lat={lat} lon={lon} />
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
}
