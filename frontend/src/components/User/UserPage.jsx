import React, { useState, useMemo } from "react";
import UserPageHeader from "./UserPageHeader";
import SearchBar from "../SearchBar";
import DataTable from "../DataTable";
import { fetchUserInfo } from "../../api/auth.api";
import useFetch from "../../hooks/useFetch";
import DashboardLayout from "../../layout/DashboardLayout";

const UserPage = () => {
  const [search, setSearch] = useState("");

  // Fetch Users
  const { data, isLoading, isError, error } = useFetch(
    ["users"],
    fetchUserInfo
  );

  console.log(data); //data is 
  

  // Filter Users (client-side filtering)
  const filteredUsers = useMemo(() => {
    if (!data) return [];

    return data?.data?.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Table Columns (Scalable)
  const columns = [
    {
      header: "Name",
      accessor: "fullName",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Role",
      accessor: "role",
    },
    {
  header: "Joined At",
  accessor: "createdAt",
  render: (row) => (
    <span className="text-sm text-gray-600">
      {new Date(row.createdAt).toLocaleDateString()}
    </span>
  ),
},
  ];

  if (isError) {
    return <div className="text-red-500 p-6">Error: {error.message}</div>;
  }

  return (
    <DashboardLayout >
    <div className="space-y-6 p-4 sm:p-6">
      
      {/* 🔝 Header */}
      <UserPageHeader
        title="User Management"
        totalCount={data?.data?.length || 0}
        entityName="Users"
        buttonText="Create User"
        onButtonClick={() => console.log("Create User Clicked")}
      />

      {/* 🔎 Search */}
      <div className="w-full sm:max-w-md">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search users..."
        />
      </div>

      {/* 📊 Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        isLoading={isLoading}
        emptyMessage="No users found"
      />
    </div>
    </DashboardLayout>
  );
};

export default UserPage;