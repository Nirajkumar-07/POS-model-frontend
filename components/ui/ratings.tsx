"use client";

import { useCallback, useState } from "react";
import { Button } from "./button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingsProps {
  name?: string;
  defaultValue?: number;
  onChange?: (event: { target: { value: number } }) => void;
  color?: string;
  className?: string;
  fixed?: boolean;
  value?: number;
  size?: number;
  iconClassName?: string;
  boxClassName?: string;
}

export default function Ratings({
  defaultValue,
  name,
  onChange,
  className,
  color,
  fixed,
  value,
  size,
  iconClassName,
  boxClassName,
}: RatingsProps) {
  const [val, setVal] = useState(defaultValue || value || 0);

  const handleClick = useCallback((val: number) => {
    setVal(val);
    if (onChange) onChange({ target: { value: val } });
  }, []);

  return (
    <div className={cn("flex gap-1 items-center", boxClassName)}>
      <input
        name={name}
        readOnly
        value={val}
        type="hidden"
        hidden
        className="hidden"
      />

      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={starValue}
            type="button"
            className={cn("cursor-pointer", className)}
            onClick={() => (!fixed ? handleClick(starValue) : undefined)}
          >
            <Star
              size={size || 18}
              color={color}
              className={cn(
                "transition-colors",
                iconClassName,
                starValue <= val
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-500 fill-transparent"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
