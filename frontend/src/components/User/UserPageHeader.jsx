import React from "react";
import { Link } from "react-router-dom";

const UserPageHeader = ({
  title,
  totalCount,
  entityName = "items",
  buttonText,
  to = "create",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 ${className}`}
    >
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        {typeof totalCount === "number" && (
          <p className="text-sm text-gray-500">
            Total {totalCount} {entityName}
          </p>
        )}
      </div>

      {/* Right Section */}
      {buttonText && (
        <Link
          to={to}
          className="
            mt-2 sm:mt-0
            w-full sm:w-auto
            text-center
            bg-blue-600 text-white
            px-5 py-2
            rounded-lg
            text-sm font-medium
            hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
            shadow-sm
          "
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default UserPageHeader;