import { useState } from 'react'
import LoginForm from './components/Form/LoginForm'
// import COMPLAINT from './components/Form/Complaint'
// import NOTICE from './components/Form/Notice'
import QUERY from './components/Form/Query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CollaborationForm from './components/Form/Collaboration';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EntryPage from './components/WebInterface/Interface';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path : '', 
    element : <EntryPage />
  },
  {
    path : '/login', 
    element : <LoginForm />
  },

  {
    path : '/collaboration' , 
    element : <CollaborationForm />
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
