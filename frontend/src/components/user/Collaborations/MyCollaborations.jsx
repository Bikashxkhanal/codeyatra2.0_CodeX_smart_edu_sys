import StatusBadge from "../../shared/StatusBadge";

function MyCollaborations() {
  const collaborations = [
    {
      id: 1,
      title: "AI Research Project",
      status: "Active",
      role: "Participant"
    }
  ];

  return (
    <div style={styles.container}>
      <h3>My Collaborations</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {collaborations.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>
                <StatusBadge status={c.status} />
              </td>
              <td>{c.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px"
  },
  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse"
  }
};

export default MyCollaborations;