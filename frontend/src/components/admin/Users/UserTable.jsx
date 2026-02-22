import DataTable from "../../shared/DataTable";

function UserTable() {
  const columns = ["name", "email", "role"];
  const data = [
    { name: "John", email: "john@mail.com", role: "STUDENT" }
  ];

  return <DataTable columns={columns} data={data} />;
}

export default UserTable;