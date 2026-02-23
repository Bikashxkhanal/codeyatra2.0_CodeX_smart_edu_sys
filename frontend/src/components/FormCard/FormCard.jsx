export default function FormCard({ title, children, className = "" }) {
  return (
    <div
      className={`form-shell max-w-2xl mx-auto p-8 ${className}`}
    >
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-slate-800">{title}</h2>
      )}
      {children}
    </div>
  );
}
