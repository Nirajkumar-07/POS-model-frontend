"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { Textarea } from "./textarea";
import { Input } from "./input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "./button";
import { Label } from "./label";
import { cn } from "@/lib/utils";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    errors?: string[];
    showErrorMessage?: boolean;
    multiline?: boolean;
    boxClassName?: string;
  };

export default function InputField({
  label,
  name,
  multiline,
  readOnly,
  required,
  title,
  className,
  type,
  disabled,
  errors,
  showErrorMessage,
  hidden,
  value,
  defaultValue,
  onChange,
  onInput,
  onClick,
  rows,
  boxClassName,
  placeholder,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={cn(
        "w-full relative",
        boxClassName,
        showErrorMessage && errors && errors.length && "pb-2"
      )}
    >
      {label && (
        <Label htmlFor={name} className="mb-2 !gap-1">
          {label}
          {required && <sup className="text-red-500">*</sup>}
        </Label>
      )}
      {multiline ? (
        <Textarea
          readOnly={readOnly}
          className={cn(
            className,
            hidden && "hidden",
            errors && errors.length > 0 && "border border-red-500"
          )}
          title={title}
          disabled={disabled}
          hidden={hidden}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onInput={onInput}
          onClick={onClick}
          rows={rows}
          id={name}
          placeholder={placeholder}
          required={required}
          name={name}
        />
      ) : type == "password" ? (
        <div
          className={cn(
            "relative rounded-md",
            errors && errors.length > 0 && " border border-red-500"
          )}
        >
          <Input
            className={cn("pe-12", className, hidden && "hidden")}
            type={showPassword ? "text" : "password"}
            id={name}
            readOnly={readOnly}
            title={title}
            disabled={disabled}
            hidden={hidden}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onInput={onInput}
            onClick={onClick}
            placeholder={placeholder}
            required={required}
            name={name}
          />
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            tabIndex={-1}
            className="h-full absolute top-0 right-0 flex justify-center items-center"
          >
            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
          </Button>
        </div>
      ) : (
        <Input
          readOnly={readOnly}
          className={cn(
            className,
            hidden && "hidden",
            errors && errors.length > 0 && "border border-red-500"
          )}
          title={title}
          disabled={disabled}
          hidden={hidden}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onInput={onInput}
          onClick={onClick}
          id={name}
          type={type}
          placeholder={placeholder}
          required={required}
          name={name}
        />
      )}
      {showErrorMessage && errors && errors.length > 0 && (
        <p className="text-xs absolute bottom-1 left-0">{errors[0]}</p>
      )}
    </div>
  );
}
