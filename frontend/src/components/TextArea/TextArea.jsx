import React, { forwardRef } from "react";

const TextArea = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      rows = 4,
      required = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none ${className}`}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;