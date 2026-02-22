export default function NoticeCard({
  title,
  description,
  expiryDate,
  type = "general",        // general | specific
  specificEmail,
  createdAt,
  showAdminDetails = false // only true in admin dashboard
}) {
  const isExpired =
    expiryDate && new Date(expiryDate) < new Date();

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 border-l-4 transition-all duration-200 hover:shadow-lg ${
        isExpired
          ? "border-gray-400 opacity-70"
          : type === "general"
          ? "border-indigo-500"
          : "border-yellow-500"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            type === "general"
              ? "bg-indigo-100 text-indigo-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {type === "general" ? "General" : "Specific"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 whitespace-pre-line">
        {description}
      </p>

      {/* Footer Info */}
      <div className="flex flex-col gap-1 text-xs text-gray-500">
        {expiryDate && (
          <span>
            Expiry Date: {new Date(expiryDate).toLocaleDateString()}
          </span>
        )}

        {createdAt && (
          <span>
            Created On: {new Date(createdAt).toLocaleDateString()}
          </span>
        )}

        {/* Only show specific email in admin panel */}
        {showAdminDetails && type === "specific" && (
          <span>Target Email: {specificEmail}</span>
        )}

        {isExpired && (
          <span className="text-red-500 font-medium">
            This notice has expired
          </span>
        )}
      </div>
    </div>
  );
}