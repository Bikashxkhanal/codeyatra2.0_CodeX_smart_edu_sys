import React from "react";

const DataTable = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = "No data available",
  className = "",
}) => {
  return (
    <div className={`w-full overflow-x-auto bg-white rounded-xl shadow ${className}`}>
      <table className="w-full border-collapse">
        
        {/* Header */}
        <thead className="bg-gray-100 text-left text-sm uppercase tracking-wide text-gray-600">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {col.render
                      ? col.render(row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;