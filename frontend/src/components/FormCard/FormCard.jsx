export default function FormCard({ title, children, className = "" }) {
  return (
    <div
      className={`max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg ${className}`}
    >
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      )}
      {children}
    </div>
  );
}