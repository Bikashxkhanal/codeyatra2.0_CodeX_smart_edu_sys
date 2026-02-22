import { useState } from "react";

function RaiseComplaintForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General"
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Title and Description are required");
      return;
    }

    if (onSubmit) {
      onSubmit(form);
    }

    setForm({
      title: "",
      description: "",
      category: "General"
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Raise Complaint</h3>

      <input
        type="text"
        placeholder="Complaint Title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        style={styles.input}
      />

      <select
        value={form.category}
        onChange={(e) => handleChange("category", e.target.value)}
        style={styles.input}
      >
        <option value="General">General</option>
        <option value="Technical">Technical</option>
        <option value="Academic">Academic</option>
      </select>

      <textarea
        placeholder="Describe your issue..."
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        style={styles.textarea}
      />

      <button type="submit" style={styles.button}>
        Submit Complaint
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "600px"
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  textarea: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "100px"
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer"
  }
};

export default RaiseComplaintForm;