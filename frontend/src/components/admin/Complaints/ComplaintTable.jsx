import StatusBadge from "../../shared/StatusBadge";

function ComplaintTable() {
  const complaints = [
    { id: 1, title: "Login Issue", status: "Pending" }
  ];

  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((c) => (
          <tr key={c.id}>
            <td>{c.title}</td>
            <td><StatusBadge status={c.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ComplaintTable;