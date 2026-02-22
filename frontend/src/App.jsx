import { useState } from 'react'
import LoginForm from './components/Form/LoginForm'
// import COMPLAINT from './components/Form/Complaint'
// import NOTICE from './components/Form/Notice'
import QUERY from './components/Form/Query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CollaborationForm from './components/Form/Collaboration';

const router = createBrowserRouter([
  {
    path : '', 
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
    <RouterProvider router={router} >
   </RouterProvider>
   </>
  )
}
export default App
