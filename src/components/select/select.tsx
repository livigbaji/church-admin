import { ReactNode, useEffect, useRef, useState } from "react";
import { ReactComponent as Caret } from "@/assets/svgs/caret.svg";
import { ReactComponent as CheckMarkIcon } from "@/assets/svgs/check-mark-icon.svg";
import { useCustomState } from "@/utils";

export type SelectProps = {
  value?: string | number;
  label?: string;
  name?: string;
  onChange: (value: string | number | any) => any;
  options?: Array<{ name: string | ReactNode; value: string | number }>;
  className?: string;
  placeholder?: string;
  noBorder?: boolean;
};

export function Select({
  options,
  onChange,
  value,
  label,
  className,
  placeholder,
  noBorder,
}: SelectProps) {
  const [showDropDown, setShowDropDown] = useState(false);

  const [_value, _setValue] = useCustomState<string | number>(value ?? "");

  const divRef = useRef<HTMLDivElement>(null);

  const [_pos, setPos] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    function getRect() {
      const rect = divRef.current?.getBoundingClientRect();
      if (rect) {
        const { width, height, x, y } = rect;
        setPos({ x, y, width, height });
      }
      // ...
    }

    getRect();

    divRef.current?.addEventListener("blur", () => setShowDropDown(false));

    window.addEventListener("resize", getRect);

    return () => {
      if (divRef?.current) {
        divRef.current.removeEventListener("blur", () =>
          setShowDropDown(false)
        );
      }
      window.removeEventListener("resize", getRect);
    };
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        window.blur();
      }}
      className={`flex flex-col gap-y-2 relative min-w-28 min-h-9 ${className}`}
    >
      {label ? (
        <label className="text-[12px] md:text-[14px] font-normal text-inherit">
          {label}
        </label>
      ) : (
        ""
      )}
      <div ref={divRef} tabIndex={-1} className={`select-none w-full h-full`}>
        <div
          onClick={() => setShowDropDown(!showDropDown)}
          className={` w-full h-full flex items-center justify-between px-4  md:cursor-pointer ${
            noBorder ? "" : "border border-[#D0D5DD] shadow-sm rounded-[4px]"
          }`}
        >
          <span className="text-[12px] sm:text-[13px]">
            {_value
              ? options?.find((option) => option.value === _value)?.name
              : placeholder || "Select"}
          </span>
          {/* {placeholder === '' && !value ? (
						<span className="text-[12px] sm:text-[13px]">
							{_value ? options?.find(option => option.value === _value)?.name : 'Select'}
						</span>
					) : (
						<span className="text-[12px] sm:text-[13px]">{placeholder}</span>
					)} */}
          {/* 
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`transition-all ${
              showDropDown ? "rotate-180" : "rotate-0"
            }`}
          /> */}

          <Caret />
        </div>

        {showDropDown ? (
          <div className="w-full rounded-[10px] absolute bg-white top-[calc(100%+10px)] z-[500] border max-h-[370px] overflow-auto">
            {options?.map((option, i) => (
              <div
                onClick={() => {
                  _setValue(option.value);
                  onChange(option.value);
                  setShowDropDown(false);
                }}
                className="p-4 md:cursor-pointer hover:bg-[ghostwhite] flex justify-between items-center"
                key={i}
              >
                <span className="text-[12px] sm:text-[14px]">
                  {option.name}
                </span>
                {option.value === _value ? (
                  //   <FontAwesomeIcon
                  //     icon={faCheck}
                  //     className="w-[14px] h-[14px] text-[#1DBF73]"
                  //   />
                  <CheckMarkIcon />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
