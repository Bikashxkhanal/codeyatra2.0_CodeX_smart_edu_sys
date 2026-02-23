const FeedCard = ({ item }) => {
  const isQuery = item.type === "Query";

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{item.title}</h3>

        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            isQuery
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {item.type}
        </span>
      </div>

      <p className="text-gray-600 mt-3">{item.description}</p>

      {isQuery ? (
        <div className="mt-4">
          <textarea
            placeholder="Write response..."
            className="w-full border rounded p-2"
          />
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      ) : (
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Collaborate
        </button>
      )}
    </div>
  );
};

export default FeedCard;