function QueryTable() {
  const queries = [
    { id: 1, title: "Project Help", responses: 3 }
  ];

  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>Title</th>
          <th>Responses</th>
        </tr>
      </thead>
      <tbody>
        {queries.map((q) => (
          <tr key={q.id}>
            <td>{q.title}</td>
            <td>{q.responses}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default QueryTable;