export default function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="flex gap-6">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="accent-indigo-600"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}