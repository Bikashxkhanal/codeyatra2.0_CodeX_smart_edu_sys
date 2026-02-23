import React from "react";

const NoticeCard = ({ notice }) => {
  const { title, description, createdAt, creator } = notice;
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      {/* Notice Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Notice Description */}
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Creator Info */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{new Date(createdAt).toLocaleDateString()}</span>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-medium">{creator?.fullName}</span>
            <span>@{creator?.username}</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs">
            {creator?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;