import CreateUserForm from "./CreateUserForm";
import UserTable from "./UserTable";

function UsersModule() {
  return (
    <div>
      <h3>User Management</h3>
      <CreateUserForm />
      <UserTable />
    </div>
  );
}

export default UsersModule;