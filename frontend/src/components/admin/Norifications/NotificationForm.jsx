import { useState } from "react";

function NotificationForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "ALL",
    specificEmails: "",
    sendEmail: false
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.message) {
      alert("Title and Message are required");
      return;
    }

    const payload = {
      ...form,
      specificEmails:
        form.audience === "SPECIFIC"
          ? form.specificEmails.split(",").map((e) => e.trim())
          : []
    };

    if (onSubmit) {
      onSubmit(payload);
    }

    // Reset form
    setForm({
      title: "",
      message: "",
      audience: "ALL",
      specificEmails: "",
      sendEmail: false
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {/* Title */}
      <div style={styles.field}>
        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={styles.input}
          placeholder="Enter notification title"
        />
      </div>

      {/* Message */}
      <div style={styles.field}>
        <label>Message</label>
        <textarea
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          style={styles.textarea}
          placeholder="Enter notification message"
        />
      </div>

      {/* Audience Selection */}
      <div style={styles.field}>
        <label>Audience</label>
        <select
          value={form.audience}
          onChange={(e) => handleChange("audience", e.target.value)}
          style={styles.input}
        >
          <option value="ALL">All Users</option>
          <option value="STUDENT">Students</option>
          <option value="TEACHER">Teachers</option>
          <option value="SPECIFIC">Specific Users (Email)</option>
        </select>
      </div>

      {/* Specific Emails */}
      {form.audience === "SPECIFIC" && (
        <div style={styles.field}>
          <label>Enter Emails (comma separated)</label>
          <input
            type="text"
            value={form.specificEmails}
            onChange={(e) =>
              handleChange("specificEmails", e.target.value)
            }
            style={styles.input}
            placeholder="example1@mail.com, example2@mail.com"
          />
        </div>
      )}

      {/* Email Toggle */}
      <div style={styles.checkboxField}>
        <input
          type="checkbox"
          checked={form.sendEmail}
          onChange={(e) =>
            handleChange("sendEmail", e.target.checked)
          }
        />
        <label style={{ marginLeft: "8px" }}>
          Send as Email Notification
        </label>
      </div>

      {/* Submit */}
      <button type="submit" style={styles.button}>
        Send Notification
      </button>
    </form>
  );
}

const styles = {
  form: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  field: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },
  textarea: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "100px",
    marginTop: "5px"
  },
  checkboxField: {
    display: "flex",
    alignItems: "center"
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default NotificationForm;