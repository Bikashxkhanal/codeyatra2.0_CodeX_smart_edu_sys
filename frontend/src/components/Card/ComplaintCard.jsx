const ComplaintCard = ({ complaint }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-4">
      <h3 className="font-semibold">{complaint.title}</h3>
      <p className="text-gray-600 mt-2">
        {complaint.description}
      </p>

      <div className="flex gap-3 mt-4">
        <select className="border rounded px-3 py-2">
          <option>Pending</option>
          <option>On-Progress</option>
          <option>Completed</option>
        </select>

        <input
          placeholder="Add response..."
          className="border rounded px-3 py-2 flex-1"
        />

        <button className="bg-blue-600 text-white px-4 rounded">
          Update
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;