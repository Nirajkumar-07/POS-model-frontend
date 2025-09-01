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
}

export default function Ratings({
  defaultValue,
  name,
  onChange,
  className,
  color,
}: RatingsProps) {
  const [value, setValue] = useState(defaultValue || 0);

  const handleClick = useCallback((val: number) => {
    setValue(val);
    if (onChange) onChange({ target: { value: val } });
  }, []);

  return (
    <div className="flex gap-1 items-center">
      <input
        name={name}
        readOnly
        value={value}
        type="hidden"
        hidden
        className="hidden"
      />

      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <Button
            key={starValue}
            type="button"
            variant="ghost"
            className="!p-0"
            onClick={() => handleClick(starValue)}
          >
            <Star
              className={cn(
                "h-6 w-6 transition-colors",
                starValue <= value
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-transparent fill-transparent"
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}
