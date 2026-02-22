import Card from "../shared/Card";

function DashboardCards() {
  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      <Card title="Total Users" value={120} />
      <Card title="Complaints" value={45} />
      <Card title="Queries" value={78} />
      <Card title="Collaborations" value={22} />
    </div>
  );
}

export default DashboardCards;