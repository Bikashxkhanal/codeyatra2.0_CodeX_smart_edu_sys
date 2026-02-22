function StatusBadge({ status }) {
  const colors = {
    Pending: "orange",
    "In-Progress": "blue",
    Completed: "green"
  };

  return (
    <span style={{
      padding: "4px 10px",
      borderRadius: "20px",
      background: colors[status] || "gray",
      color: "#fff"
    }}>
      {status}
    </span>
  );
}

export default StatusBadge;