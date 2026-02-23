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
          <label className="text-sm font-medium text-slate-700">
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
          className={`elevated-textarea w-full border px-4 py-3 outline-none focus:ring-2 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
