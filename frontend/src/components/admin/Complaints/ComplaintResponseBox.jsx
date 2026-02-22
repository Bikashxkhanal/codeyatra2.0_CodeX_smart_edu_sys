import { useState } from "react";

function ComplaintResponseBox({ onSubmitResponse }) {
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!response.trim()) return;

    setIsSubmitting(true);

    if (onSubmitResponse) {
      onSubmitResponse(response);
    }

    setResponse("");
    setIsSubmitting(false);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Add Response:</label>

      <textarea
        placeholder="Write your response here..."
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        style={styles.textarea}
      />

      <button
        onClick={handleSubmit}
        style={styles.button}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Response"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column"
  },
  label: {
    marginBottom: "8px",
    fontWeight: "500"
  },
  textarea: {
    minHeight: "100px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
    marginBottom: "10px"
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

export default ComplaintResponseBox;