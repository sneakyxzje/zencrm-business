import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  Transition,
} from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";

interface AutocompleteProps<T> {
  label?: string;
  items: T[];
  selectedItem: T | null;
  onSelect: (item: T | null) => void;
  displayValue: (item: T) => string;
  filterFn: (item: T, query: string) => boolean;
  placeholder?: string;
}

export function AutocompleteInput<T>({
  label,
  items,
  selectedItem,
  onSelect,
  displayValue,
  filterFn,
  placeholder = "Type to search...",
}: AutocompleteProps<T>) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return query === "" ? items : items.filter((item) => filterFn(item, query));
  }, [query, items, filterFn]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#90999a] mb-1.5">
          {label}
        </label>
      )}

      <Combobox value={selectedItem} onChange={onSelect}>
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden rounded-xl bg-[#2d2d2d] border border-[#4d4d4d] focus-within:ring-2 focus-within:ring-[#f48024] focus-within:border-transparent">
            <ComboboxInput
              className="w-full border-none py-3 pl-4 pr-10 text-sm leading-5 text-[#dcdcdc] bg-transparent focus:ring-0 placeholder-[#90999a] focus:outline-none"
              displayValue={(item: any) => (item ? displayValue(item) : "")}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />

            {selectedItem && (
              <button
                onClick={() => onSelect(null)}
                className="absolute inset-y-0 right-8 flex items-center pr-2 text-gray-500 hover:text-gray-300"
              >
                ✕
              </button>
            )}

            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-[#90999a]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </ComboboxButton>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-[#2d2d2d]  text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-[#4d4d4d]">
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-[#90999a]">
                  Không tìm thấy "{query}"
                </div>
              ) : (
                filteredItems.map((item, idx) => (
                  <ComboboxOption
                    key={idx}
                    className={({ focus }) =>
                      `relative cursor-pointer select-none py-2.5 pl-4 pr-4 w-full block ${
                        focus ? "bg-[#f48024]  text-white" : "text-[#dcdcdc]"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <div className="flex flex-col">
                        <span
                          className={`block truncate ${
                            selected ? "font-bold" : "font-normal"
                          }`}
                        >
                          {displayValue(item)}
                        </span>
                      </div>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
