import { Fragment, useMemo, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Fuse from "fuse.js";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "~/shared";

const fuseOptions = {
  threshold: 0.4,
  keys: ["value", "label"],
};

export interface AutocompleteProps<
  TValue extends string,
  TOption extends {
    value: TValue;
    label: string;
    disabled?: boolean;
  } = { value: TValue; label: string },
> extends Omit<
    ComponentPropsWithoutRef<"input">,
    "onChange" | "value" | "name" | "values"
  > {
  options: TOption[];
  value: TValue;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  getKey?: (option: TOption) => string;
  onChange: (value: TValue, option: TOption) => void;
  renderOption?: (params: {
    option: TOption;
    selected: boolean;
    active: boolean;
    disabled?: boolean;
  }) => JSX.Element;
}

// TODO: virtualization of the autocomplete options when they're too big, so we improve performance
export const Autocomplete = <
  TValue extends string,
  TOption extends {
    value: TValue;
    label: string;
    disabled?: boolean;
  },
>({
  label,
  options,
  getKey,
  containerClassName,
  labelClassName,
  optionsClassName,
  optionClassName,
  className,
  placeholder,
  value,
  onChange,
  renderOption,
  ...rest
}: AutocompleteProps<TValue, TOption>) => {
  const selectedOption =
    options.find((o) => o.value === value) ??
    ({
      value: "",
      label: "",
      disabled: false,
    } as TOption);

  const [query, setQuery] = useState<string>(value);

  const fuse = useMemo(() => new Fuse(options, fuseOptions), [options]);

  const filteredOptions = useMemo(() => {
    if (query === "" || query === value) {
      return options;
    }

    return fuse.search(query).map((result) => result.item);
  }, [fuse, query, value]);

  return (
    <div
      className={cn("text-neutrals-dark-500 flex flex-col", containerClassName)}
    >
      <Combobox
        value={selectedOption}
        onChange={(option) => {
          onChange(option.value, option);
        }}
      >
        {!!label && (
          <Combobox.Label
            className={cn(
              "mb-2 block text-sm font-medium leading-6",
              labelClassName,
            )}
          >
            {label}
          </Combobox.Label>
        )}
        <div className="relative">
          <div
            className={cn(
              "border-neutrals-medium-300 focus-within:border-complementary-green-400 focus-within:ring-complementary-green-100 flex h-9 w-full cursor-default items-center gap-3 rounded-md border  px-3 text-left text-sm leading-6 shadow-sm focus-within:outline-none focus-within:ring-4",
              className,
            )}
          >
            <Combobox.Button className="flex h-full w-full items-center">
              <Combobox.Input
                autoComplete="false"
                className="placeholder:text-white-600 flex-grow border-none bg-transparent p-0 py-1.5 focus-visible:ring-0 sm:text-sm"
                // TODO: find out why ts is complaining
                // @ts-ignore
                displayValue={(option: TOption) => option.label}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                {...rest}
              />
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery(value)}
          >
            <Combobox.Options
              className={cn(
                "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                optionsClassName,
              )}
            >
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={getKey?.(option) || option.value}
                    value={option}
                    disabled={option.disabled}
                  >
                    {(optionState) =>
                      renderOption ? (
                        renderOption({
                          ...optionState,
                          option,
                        })
                      ) : (
                        <div
                          className={cn(
                            "text-14 leading-17 relative flex h-9 cursor-pointer select-none items-center px-4 py-2 sm:text-sm",
                            optionState.active &&
                              "bg-secondary-50 text-neutrals-dark-900 font-medium",
                            optionState.disabled &&
                              "cursor-not-allowed opacity-50",
                            optionClassName,
                          )}
                        >
                          <div className="flex items-center">
                            {option.label}
                          </div>
                          {optionState.selected ||
                          selectedOption.value === option.value ? (
                            <span className="text-secondary-400 absolute inset-y-0 right-0 flex items-center pr-4">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      )
                    }
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
