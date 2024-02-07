import { useEffect, useRef, useState } from "react";
import ArroDownIcon from "@/assets/icons/chevron-down.svg?react";
import { twMerge } from "tailwind-merge";

interface Option {
  value: string | number;
  label: string | number;
}

interface CustomSelectProps {
  options: Option[];
  containerClass?: string;
  btnClassName?: string;
  onChange: (value: string | number) => void;
  placeholder?: string;
  defaultOption?: string | number;
}

const CustomSelect = ({
  options,
  onChange,
  containerClass,
  btnClassName,
  defaultOption,
  placeholder = "Select",
}: CustomSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string | number | null>(defaultOption || null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string | number) => {
    if (value === selectedOption) return setIsOpen(false);
    setSelectedOption(value);
    setIsOpen(false);
    onChange(value);
  };

  const containeClasses = twMerge(
    'relative text-sm inline-block text-left w-full',
    containerClass
  )

  const btnClasses = twMerge(
    'inline-flex justify-between items-center w-full rounded-lg border border-outline py-3 px-4 font-medium',
    btnClassName
  )

  return (
    <div ref={selectRef} className={containeClasses}>
      <button
        type="button"
        className={btnClasses}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <span className="text-content-1">
            {options.find((option) => option.value === selectedOption)?.label}
          </span>
        ) : (
          <span className="text-content-3">{placeholder}</span>
        )}
        <ArroDownIcon />
      </button>
      {isOpen && (
        <div className="w-full origin-top-right absolute right-0 mt-2 rounded-md bg-neutral-dark z-50">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="block px-4 py-2 text-sm text-content-1 hover:bg-primary-orange cursor-pointer"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
