import { useState } from 'react'

import QUERY from './components/Form/Query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RadioGroup , EntryPage, LoginFormPage, CollaborationForm, ComplaintForm} from './components/index.js';
import AdminDashboard from './pages/AdminDashboard.jsx';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path : '', 
    element : <EntryPage />
  },
  {
    path : '/login', 
    element : <LoginFormPage />
  },

  {
    path : '/collaboration/create' , 
    element : <CollaborationForm />
  }, 

  {
    path : '/complaint/create',
    element : <ComplaintForm />
  },
  {
    path : '/admin', 
    element : <AdminDashboard />
  }
])

function App() {


  return (
    <>
    <QueryClientProvider client={queryClient} >
    <RouterProvider router={router} >
   </RouterProvider>
   </QueryClientProvider>
   </>
  )
}
export default App
