import { useState } from "react";

function ComplaintStatusUpdate({ currentStatus, onStatusChange }) {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Update Status:</label>

      <select
        value={status}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="Pending">Pending</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column"
  },
  label: {
    marginBottom: "5px",
    fontWeight: "500"
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  }
};

export default ComplaintStatusUpdate;