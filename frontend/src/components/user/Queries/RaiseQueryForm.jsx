import { useState } from "react";

function RaiseQueryForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Technical"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Title and Description required");
      return;
    }

    if (onSubmit) {
      onSubmit(form);
    }

    setForm({
      title: "",
      description: "",
      category: "Technical"
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Raise Query</h3>

      <input
        type="text"
        placeholder="Query Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        style={styles.input}
      />

      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        style={styles.input}
      >
        <option value="Technical">Technical</option>
        <option value="Academic">Academic</option>
        <option value="Project">Project</option>
      </select>

      <textarea
        placeholder="Explain your query..."
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        style={styles.textarea}
      />

      <button type="submit" style={styles.button}>
        Post Query
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
    backgroundColor: "#16a34a",
    color: "#fff",
    cursor: "pointer"
  }
};

export default RaiseQueryForm;