import CollaborationTable from "./CollaborationTable";

function CollaborationsModule() {
  // Dummy data (replace with API later)
  const collaborations = [
    {
      id: 1,
      title: "AI Research Project",
      participants: ["John (Student)", "Dr. Smith (Teacher)"],
      status: "Active",
      createdAt: "2024-02-10"
    },
    {
      id: 2,
      title: "Web Development Workshop",
      participants: ["Alice (Student)", "Mr. Brown (Teacher)"],
      status: "Completed",
      createdAt: "2024-01-15"
    }
  ];

  return (
    <div style={styles.container}>
      <h2>Collaborations</h2>

      <CollaborationTable data={collaborations} />
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  }
};

export default CollaborationsModule;