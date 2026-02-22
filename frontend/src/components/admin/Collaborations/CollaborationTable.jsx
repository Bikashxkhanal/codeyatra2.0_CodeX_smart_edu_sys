import StatusBadge from "../../shared/StatusBadge";

function CollaborationTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No collaborations found.</p>;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Participants</th>
          <th>Status</th>
          <th>Created Date</th>
        </tr>
      </thead>

      <tbody>
        {data.map((collab) => (
          <tr key={collab.id}>
            <td>{collab.title}</td>

            <td>
              {collab.participants.map((p, index) => (
                <div key={index}>{p}</div>
              ))}
            </td>

            <td>
              <StatusBadge status={collab.status} />
            </td>

            <td>{collab.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  }
};

export default CollaborationTable;