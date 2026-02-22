// import { useState } from 'react'
// import LoginForm from './components/Form/LoginForm'
// import COMPLAINT from './components/Form/Complaint'
// import NOTICE from './components/Form/Notice'
// import QUERY from './components/Form/Query'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CollaborationForm from './components/Form/Collaboration';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserDashboard from './components/user/UserDashboard';

const queryClient = new QueryClient();

// const router = createBrowserRouter([
//   {
//     path : '', 
//     element : <LoginForm />
//   },

//   {
//     path : '/collaboration' , 
//     element : <CollaborationForm />
//   }, 
//   {
//     path : '/'
//   }
// ])

function App() {


  return (
    <>
    <QueryClientProvider client={queryClient} >
    <UserDashboard />
   </QueryClientProvider>
   </>
  )
}
export default App
