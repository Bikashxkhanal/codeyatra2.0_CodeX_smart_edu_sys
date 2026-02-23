import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"; 
import store from "./Stores/store.js";
import DashboardSelector from "./components/DashboardSelector.jsx";
import QUERY from "./components/Form/Query";
import {
  RadioGroup,
  EntryPage,
  LoginFormPage,
  CollaborationForm,
  ComplaintForm,
} from "./components/index.js";

import UserPage from "./components/User/UserPage.jsx";
import UserCreationForm from "./components/User/CreateUser.jsx";


// Create React Query client
const queryClient = new QueryClient();

import Protected from "./components/ProtectedRoute/ProtectedRoute.jsx";
// The advanced component we built

const router = createBrowserRouter([
  { path: "/", element: <EntryPage /> },
  { path: "/login", element: <LoginFormPage /> },

  /* --- Unified Protected Routes --- */
  {
    element: <Protected allowedRoles={["admin", "teacher", "student"]} />,
    children: [
      // Now /dashboard is universal!
      { path: "/dashboard", element: <DashboardSelector /> },
      
      // Feature-specific routes
      { path: "/collaboration/create", element: <CollaborationForm /> },
    ],
  },

  /* --- Admin Strict Routes --- */
  {
    element: <Protected allowedRoles={["admin"]} />,
    children: [
      { path: "/users", element: <UserPage /> },
      { path: "/users/create", element: <UserCreationForm /> },
    ],
  },

  /* --- Student Strict Routes --- */
  {
    element: <Protected allowedRoles={["student"]} />,
    children: [
      { path: "/complaint/create", element: <ComplaintForm /> },
    ],
  },

  { path: "/404", element: "Access Denied" },
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