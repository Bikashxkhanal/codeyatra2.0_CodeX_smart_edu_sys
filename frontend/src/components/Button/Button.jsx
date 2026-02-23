export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}) {
  const baseStyles =
    "rounded-xl font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    login:
      "btn-modern w-full focus:ring-blue-500",
    delete:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md",
    create:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md",
    update:
      "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 shadow-md",
    secondary:
      "btn-modern-muted focus:ring-slate-400",
    primary:
      "btn-modern focus:ring-blue-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
