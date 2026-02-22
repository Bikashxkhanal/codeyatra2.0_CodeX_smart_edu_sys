import Card from "../shared/Card";

function UserDashboard() {
  return (
    <div style={styles.container}>
      <h2>User Dashboard</h2>

      <div style={styles.cardWrapper}>
        <Card title="My Complaints" value={5} />
        <Card title="My Queries" value={3} />
        <Card title="My Collaborations" value={2} />
        <Card title="Notifications" value={4} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  cardWrapper: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap"
  }
};

export default UserDashboard;