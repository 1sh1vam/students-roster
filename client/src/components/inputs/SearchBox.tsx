import React, { useRef, useState } from "react";
import MagnifyingIcon from "@/assets/icons/magnifying-glass.svg?react";
import Button from "../buttons/Button";
import XIcon from "@/assets/icons/close.svg?react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface SearchBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  containerClass?: string;
  onSearch?: (name: string) => void;
  clearSearch?: () => void;
}

const SearchBox = ({
  containerClass,
  className,
  onSearch,
  clearSearch,
  ...props
}: SearchBoxProps) => {
  const [text, setText] = useState("");
  const [searchApplied, setSearchApplied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (!text.length) return;
    inputRef.current?.blur();
    setSearchApplied(true);
    if (onSearch) onSearch(text);
  };

  const handleClearSearch = () => {
    setSearchApplied(false);
    setText("");
    if (clearSearch) clearSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") handleClearSearch();
  };

  const classes = twMerge(
    "flex flex-row items-center px-4 py-3 border border-outline rounded-lg",
    containerClass
  );

  const inputClasses = twMerge(
    "p-0 text-sm bg-transparent outline-none border-none ml-2.5 text-content-2 placeholder:text-content-3",
    clsx({
      "text-content-1": searchApplied,
    }),
    className
  );

  return (
    <div className={classes}>
      <div className="w-4 h-4">
        <MagnifyingIcon />
      </div>
      <input
        {...props}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        type="text"
        value={text}
        className={inputClasses}
      />
      {searchApplied ? (
        <div onClick={handleClearSearch} className="cursor-pointer text-content-3">
          <XIcon />
        </div>
      ) : text.length ? (
        <Button onClick={handleSearch} variant="ghost">
          Search
        </Button>
      ) : null}
    </div>
  );
};

export default SearchBox;
