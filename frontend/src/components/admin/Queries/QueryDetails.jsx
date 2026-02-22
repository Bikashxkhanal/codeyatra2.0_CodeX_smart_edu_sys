import StatusBadge from "../../shared/StatusBadge";

function QueryDetails({ query }) {
  if (!query) {
    return <p>No query selected.</p>;
  }

  return (
    <div style={styles.container}>
      {/* Query Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>{query.title}</h2>
        {query.status && (
          <StatusBadge status={query.status} />
        )}
      </div>

      {/* Query Meta */}
      <div style={styles.meta}>
        <p>
          <strong>Category:</strong> {query.category}
        </p>
        <p>
          <strong>Created By:</strong> {query.createdBy}
        </p>
        <p>
          <strong>Date:</strong> {query.createdAt}
        </p>
      </div>

      {/* Query Description */}
      <div style={styles.descriptionBox}>
        <h4>Description</h4>
        <p>{query.description}</p>
      </div>

      {/* Responses Section */}
      <div style={styles.responsesSection}>
        <h4>Responses ({query.responses?.length || 0})</h4>

        {query.responses && query.responses.length > 0 ? (
          query.responses.map((response, index) => (
            <div key={index} style={styles.responseCard}>
              <div style={styles.responseHeader}>
                <strong>{response.user}</strong>
                <span style={styles.responseDate}>
                  {response.createdAt}
                </span>
              </div>
              <p style={styles.responseMessage}>
                {response.message}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: "#777" }}>
            No responses yet.
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    maxWidth: "800px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  title: {
    margin: 0
  },
  meta: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px"
  },
  descriptionBox: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "25px"
  },
  responsesSection: {
    marginTop: "10px"
  },
  responseCard: {
    background: "#f4f6f8",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "12px"
  },
  responseHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
    fontSize: "14px"
  },
  responseDate: {
    color: "#888",
    fontSize: "12px"
  },
  responseMessage: {
    margin: 0
  }
};

export default QueryDetails;