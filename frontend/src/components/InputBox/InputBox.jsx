import React, { forwardRef } from "react";

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "w-full px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantStyles = {
  default:
    "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  outline:
    "border-2 border-gray-400 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  ghost:
    "border border-transparent bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:bg-white",
};

const Input = forwardRef(
  (
    {
      label,
      helperText,
      error,
      type = "text",
      size = "md",
      variant = "default",
      fullWidth = true,
      leftIcon,
      rightIcon,
      className = "",
      containerClassName = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "rounded-lg transition-all duration-200 outline-none";

    const sizeClass = sizeStyles[size] || sizeStyles.md;
    const variantClass = variantStyles[variant] || variantStyles.default;

    const errorClass = error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "";

    const disabledClass = disabled
      ? "bg-gray-100 cursor-not-allowed opacity-70"
      : "";

    const paddingLeft = leftIcon ? "pl-10" : "";
    const paddingRight = rightIcon ? "pr-10" : "";

    const inputClasses = `
      ${baseClasses}
      ${sizeClass}
      ${variantClass}
      ${errorClass}
      ${disabledClass}
      ${paddingLeft}
      ${paddingRight}
      ${className}
    `;

    return (
      <div
        className={`flex flex-col gap-1 ${
          fullWidth ? "w-full" : ""
        } ${containerClassName}`}
      >
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-gray-400">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 text-gray-400">
              {rightIcon}
            </span>
          )}
        </div>

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          helperText && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;