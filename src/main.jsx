import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CustomContextProvider } from './context/CustomContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/authentication/LoginPage.jsx'
import PageNotFound from './pages/error/PageNotFound.jsx'
import SignUpPage from './pages/authentication/SignUpPage.jsx'
import OtpChecking from './pages/authentication/OtpChecking.jsx'
import EmailCheking from './pages/authentication/EmailCheking.jsx'
import NewPassword from './pages/authentication/NewPassword.jsx'
import RequireAuth from './pages/security/RequireAuth.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Profile from './pages/profile/Profile.jsx'
import ChangePass from './pages/profile/ChangePass.jsx'
import Task from './pages/tasks/Task.jsx'
import NewTask from './pages/tasks/NewTask.jsx'
import UpdateTask from './pages/tasks/UpdateTask.jsx'
import TaskDetail from './pages/tasks/TaskDetail.jsx'
import Unothaurized from './pages/error/Unothaurized.jsx'
import User from './pages/user/User.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <CustomContextProvider>
          <Routes>

            <Route index element = { <LoginPage />} />
            <Route path = '/signup' element = { <SignUpPage />} />
            <Route path = '/otpcheking' element = { <OtpChecking />} />
            <Route path = '/emailcheking' element = { <EmailCheking />} />
            <Route path = '/newpassword' element = { <NewPassword />} />

            <Route path = '/aqs' element = { <App /> } >

              <Route  element = { <RequireAuth allowedRoles = {['approving', 'director']} />} >

                <Route path = 'dashboard' element = { <Dashboard /> } />

                <Route path = 'profile' element = { <Profile /> } />
                <Route path = 'profile/changePass' element = { <ChangePass /> } />

                <Route path = 'task' element = { <Task /> } />
                <Route path = 'task/new' element = { <NewTask /> } />
                <Route path = 'task/update' element = { <UpdateTask /> } />
                <Route path = 'task/detail/:task_id' element = { <TaskDetail /> } />

                <Route path = 'unothaurized' element = { <Unothaurized /> } />

              </Route>

              <Route  element = { <RequireAuth allowedRoles = {['approving']} />} >
                <Route path = 'user' element = { <User /> } />
              </Route>

            </Route>

            <Route path = '*' element = { <PageNotFound /> } />

          </Routes>
          
        </CustomContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
