import NotificationForm from "./NotificationForm";

function NotificationsModule() {
  const handleSendNotification = (data) => {
    console.log("Notification Data:", data);
    // API call can be added here later
  };

  return (
    <div style={styles.container}>
      <h2>Push Notification</h2>

      <NotificationForm onSubmit={handleSendNotification} />
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    maxWidth: "700px"
  }
};

export default NotificationsModule;