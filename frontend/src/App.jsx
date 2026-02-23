import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"; 
import store from "./Stores/store.js";

import QUERY from "./components/Form/Query";
import {
  RadioGroup,
  EntryPage,
  LoginFormPage,
  CollaborationForm,
  ComplaintForm,
} from "./components/index.js";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserPage from "./components/User/UserPage.jsx";
import UserCreationForm from "./components/User/CreateUser.jsx";
import { useEffect } from "react";
import UserDashboard from "./pages/UserDashboard.jsx";

// Create React Query client
const queryClient = new QueryClient();

// Router setup
const router = createBrowserRouter([
  { path: "/", element: <EntryPage /> },
  { path: "/login", element: <LoginFormPage /> },
  { path: "/collaboration/create", element: <CollaborationForm /> },
  { path: "/complaint/create", element: <ComplaintForm /> },
  { path: "/dashboard", element: <AdminDashboard /> },
  { path: "/users", element: <UserPage /> },
  { path: "/users/create", element: <UserCreationForm /> }, 
  {path : "/dashboard/user", element : <UserDashboard />},
]);

function App() {
 
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;