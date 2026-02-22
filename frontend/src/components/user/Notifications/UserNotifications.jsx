function UserNotifications() {
  const notifications = [
    {
      id: 1,
      title: "System Maintenance",
      message: "System will be down tonight.",
      date: "2024-02-10"
    }
  ];

  return (
    <div style={styles.container}>
      <h3>Notifications</h3>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((n) => (
          <div key={n.id} style={styles.card}>
            <h4>{n.title}</h4>
            <p>{n.message}</p>
            <small>{n.date}</small>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px"
  },
  card: {
    padding: "12px",
    borderBottom: "1px solid #eee"
  }
};

export default UserNotifications;